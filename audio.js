class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.windNode = null;
    this.riverNode = null;
    this.rainNode = null;
    this.bonfireNode = null;
    this.birdTimer = null;
    this.isMuted = false;
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Setup ambient loops - disabled ambient noise, keeping only bird chirps
    // this.setupWind();
    // this.setupRiver();
    // this.setupRain();
    // this.setupBonfire();
    this.startBirdScheduler();
  }

  // Helper to create noise buffer
  createNoiseBuffer() {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }

  setupWind() {
    const buffer = this.createNoiseBuffer();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    // Modulate filter frequency with LFO
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime); // swing from 150 to 450Hz

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0, this.ctx.currentTime); // start silent

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    lfo.start();
    source.start();

    this.windNode = { source, filter, gainNode, lfo };
  }

  setupRiver() {
    const buffer = this.createNoiseBuffer();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to get water frequency
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    // Modulate gain slightly for bubbling effect
    const bubbleLFO = this.ctx.createOscillator();
    bubbleLFO.frequency.setValueAtTime(4.0, this.ctx.currentTime); // 4Hz bubble speed
    const bubbleGain = this.ctx.createGain();
    bubbleGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // bubble intensity

    bubbleLFO.connect(bubbleGain);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0, this.ctx.currentTime); // start silent

    // connect bubble modulation to gain
    bubbleGain.connect(gainNode.gain);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    bubbleLFO.start();
    source.start();

    this.riverNode = { source, filter, gainNode, bubbleLFO };
  }

  setupRain() {
    const buffer = this.createNoiseBuffer();
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    source.start();

    this.rainNode = { source, filter, gainNode };
  }

  setupBonfire() {
    // 1. Rumble (Low frequency crackle)
    const rumbleBuffer = this.createNoiseBuffer();
    const rumbleSource = this.ctx.createBufferSource();
    rumbleSource.buffer = rumbleBuffer;
    rumbleSource.loop = true;

    const rumbleFilter = this.ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.setValueAtTime(90, this.ctx.currentTime);

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    // Modulate rumble
    const rumbleLFO = this.ctx.createOscillator();
    rumbleLFO.frequency.setValueAtTime(8.0, this.ctx.currentTime);
    const rumbleLFOGain = this.ctx.createGain();
    rumbleLFOGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    rumbleLFO.connect(rumbleLFOGain);
    rumbleLFOGain.connect(rumbleGain.gain);

    rumbleSource.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);

    rumbleSource.start();
    rumbleLFO.start();

    // 2. Pops (Crackle spikes)
    const popGain = this.ctx.createGain();
    popGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    popGain.connect(this.masterGain);

    this.bonfireNode = {
      rumbleSource,
      rumbleFilter,
      rumbleGain,
      rumbleLFO,
      popGain,
      popInterval: null,
      isActive: false
    };
  }

  startBonfirePops() {
    if (this.bonfireNode.popInterval) return;
    this.bonfireNode.popInterval = setInterval(() => {
      if (!this.bonfireNode.isActive || this.isMuted) return;
      // Random crackle trigger
      if (Math.random() < 0.6) {
        this.triggerPop();
      }
    }, 180);
  }

  stopBonfirePops() {
    if (this.bonfireNode.popInterval) {
      clearInterval(this.bonfireNode.popInterval);
      this.bonfireNode.popInterval = null;
    }
  }

  triggerPop() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000 + Math.random() * 4000, this.ctx.currentTime);
    filter.Q.setValueAtTime(10.0, this.ctx.currentTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100 + Math.random() * 500, this.ctx.currentTime);

    // Quick snap envelope
    const now = this.ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.15, now + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.01 + Math.random() * 0.02);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.bonfireNode.popGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  triggerBirdChirp() {
    if (!this.ctx || this.ctx.state === 'suspended' || this.isMuted) return;
    const now = this.ctx.currentTime;
    
    const chirpCount = 2 + Math.floor(Math.random() * 3);
    let startTime = now;

    for (let i = 0; i < chirpCount; i++) {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const duration = 0.08 + Math.random() * 0.06;
      const baseFreq = 1800 + Math.random() * 800;
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, startTime);
      if (Math.random() > 0.5) {
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 1200, startTime + duration);
      } else {
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 800, startTime + duration);
      }

      gainNode.gain.setValueAtTime(0.0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.02 + Math.random() * 0.02, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);

      startTime += duration + 0.05 + Math.random() * 0.1;
    }
  }

  startBirdScheduler() {
    this.birdTimer = setInterval(() => {
      if (this.ctx && this.ctx.state !== 'suspended' && !this.isMuted && Math.random() < 0.45) {
        this.triggerBirdChirp();
      }
    }, 3500);
  }

  fadeNode(node, targetVal, duration = 2.0) {
    if (!node || !node.gainNode) return;
    const currTime = this.ctx.currentTime;
    node.gainNode.gain.cancelScheduledValues(currTime);
    node.gainNode.gain.setValueAtTime(node.gainNode.gain.value, currTime);
    node.gainNode.gain.linearRampToValueAtTime(targetVal, currTime + duration);
  }

  setWind(target, duration = 2.0) {
    // Ambient noise disabled by user request
  }

  setRiver(target, duration = 2.0) {
    // River sound disabled by user request
  }

  setRain(target, duration = 2.0) {
    // Rain sound disabled by user request
  }

  setBonfire(target, duration = 2.0) {
    // Bonfire sound disabled by user request
  }

  mute() {
    this.isMuted = true;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  unmute() {
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    }
  }
}

export const audioEngine = new AudioEngine();
