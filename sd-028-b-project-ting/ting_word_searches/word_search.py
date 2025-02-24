def exists_word(word, instance):
   
    for doc in instance.pdr:
        file = doc["nome_do_arquivo"]
        row = doc["linhas_do_arquivo"]
        event = []
        
        new = word.lower()

        for elem, row in enumerate(row, start=1):
            row = row.lower()
            if new in row:
                event.append({"linha": elem})
        
        data = []
        if event:
            data.append(
                {
                    "palavra": new,
                    "arquivo": file,
                    "ocorrencias": event,
                }
            )

    return data


def search_by_word(word, instance):
    """Aqui irá sua implementação"""