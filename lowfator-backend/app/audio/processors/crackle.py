import numpy as np
import soundfile as sf

def _crackle_noise(n: int, sr: int, density: float = 0.003, amp: float = 0.12) -> np.ndarray:
    # random click (impulse) + short decay
    noise = np.zeros(n, dtype=np.float32)
    num = int(n * density)
    if num <= 0:
        return noise

    idx = np.random.randint(0, n, size=num)
    noise[idx] = (np.random.rand(num).astype(np.float32) * 2 - 1) * amp

    # decay to convert into clicks into “crackles”
    decay_len = int(0.084 * sr)
    if decay_len > 1:
        kernel = np.exp(-np.linspace(0, 9.0, decay_len)).astype(np.float32)
        noise = np.convolve(noise, kernel, mode="same")

    return noise

def apply_vinyl_crackle(input_path: str, output_path: str, mix: float = 0.35) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    density = 0.001
    amp = 0.10
    

    n = audio.shape[0]
    crack = _crackle_noise(n, sr, density=density, amp=amp)

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = np.clip(audio[:, ch] + mix * crack, -1.0, 1.0)

    sf.write(output_path, out, sr)

