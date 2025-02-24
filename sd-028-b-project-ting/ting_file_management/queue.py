from ting_file_management.abstract_queue import AbstractQueue


class Queue(AbstractQueue):
    def __init__(self):
        self.pdr = list()

    def __len__(self):
        return len(self.pdr)

    def enqueue(self, value):
        return self.pdr.append(value)

    def dequeue(self):
        if len(self.pdr) == 0:
            return None
        return self.pdr.pop(0)

    def search(self, index):
        if index < 0 or index >= len(self.pdr):
            raise IndexError("Índice Inválido ou Inexistente")
        return self.pdr[index]