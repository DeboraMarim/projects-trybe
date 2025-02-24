import sys


def txt_importer(path_file):
    """Aqui irá sua implementação"""
    if not path_file.endswith('.txt'):
        print("Formato inválido", file=sys.stderr)

    try:
        with open(path_file, "r") as file:
            file = file.read()
            new = file.split("\n")
            return new
    except FileNotFoundError:
        sys.stderr.write(f"Arquivo {path_file} não encontrado\n")
        return []