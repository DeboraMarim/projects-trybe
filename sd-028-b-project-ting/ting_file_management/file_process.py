from ting_file_management.file_management import txt_importer
import sys


def process(path_file, instance):
    for elem in range(len(instance)):
        if instance.search(elem)["nome_do_arquivo"] == path_file:
            return ""

    row = txt_importer(path_file)

    doc = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(row),
        "linhas_do_arquivo": row,
    }

    instance.enqueue(doc)
    print(doc)


def remove(instance):
    new = instance
    if not new:
        print("Não há elementos")
        return ""
    remove = new.dequeue()

    sys.stdout.write(
        f"Arquivo {remove['nome_do_arquivo']} removido com sucesso\n"
    )


def file_metadata(instance, position):
    new = instance
    try:
        doc = new.search(position)
        print(doc)
    except IndexError:
        sys.stderr.write("Posição inválida")