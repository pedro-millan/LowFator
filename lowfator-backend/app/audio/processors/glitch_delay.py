import numpy as np
import soundfile as sf

def _sample_hold(x: np.ndarray, hold: int) -> np.ndarray:
    # robotic effect
    if hold <= 1:
        return x
    y = x.copy()
    for i in range(0, len(y), hold):
        y[i:i+hold] = y[i]
    return y

def _glitchify(x: np.ndarray, sr: int,
              stutter_prob: float = 0.18,
              reverse_prob: float = 0.10,
              hold_prob: float = 0.18) -> np.ndarray:

    n = len(x)
    y = x.copy()

    # chunk glitch size
    chunk_min = int(sr * 0.02)
    chunk_max = int(sr * 0.08)

    i = 0
    while i < n:
        chunk = np.random.randint(chunk_min, chunk_max + 1)
        end = min(n, i + chunk)

        r = np.random.rand()

        # Stutter
        if r < stutter_prob and i - chunk >= 0:
            y[i:end] = y[i - chunk:i - chunk + (end - i)]

        # Reverse chunk
        elif r < stutter_prob + reverse_prob:
            y[i:end] = y[i:end][::-1]

        # Sample & Hold inside chunk
        elif r < stutter_prob + reverse_prob + hold_prob:
            hold = np.random.randint(10, 80)  # stepping (ajustable)
            y[i:end] = _sample_hold(y[i:end], hold)

        i = end

    return y.astype(np.float32)

def _glitch_delay_1d(x: np.ndarray, sr: int,
                     delay_ms: float = 140.0,
                     feedback: float = 0.55,
                     mix: float = 0.55) -> np.ndarray:
    n = len(x)
    d = max(1, int(sr * (delay_ms / 1000.0)))

    # glitchify input
    xin = _glitchify(x, sr)

    out = np.zeros(n, dtype=np.float32)
    buf = np.zeros(n + d + 1, dtype=np.float32)

    for i in range(n):
        inp = xin[i]
        delayed = buf[i]

        # feedback loop
        buf[i + d] += inp + delayed * feedback

        # mix
        out[i] = (1 - mix) * x[i] + mix * delayed

    # limiter
    return np.clip(out, -1.0, 1.0).astype(np.float32)

def apply_glitch_delay(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    delay_ms = 85.0
    feedback = 0.65
    mix = 0.20

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = _glitch_delay_1d(audio[:, ch], sr, delay_ms=delay_ms, feedback=feedback, mix=mix)

    sf.write(output_path, out, sr)


