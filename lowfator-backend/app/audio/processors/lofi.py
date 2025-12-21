import shutil

def apply_lofi(input_path: str, output_path: str) -> None:
    shutil.copyfile(input_path, output_path)
