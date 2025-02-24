from typing import List
from inventory_report.importers import JsonImporter, CsvImporter
from inventory_report.inventory import Inventory
from inventory_report.reports import SimpleReport, CompleteReport

def create_report(inventory: Inventory, report_type: str) -> str:
    report_classes = {
        'simple': SimpleReport,
        'complete': CompleteReport
    }
    
    if report_type not in report_classes:
        raise ValueError('Report type is invalid.')

    report_instance = report_classes[report_type]()
    report_instance.add_inventory(inventory)
    return report_instance.generate()

def process_report_request(file_paths: List[str], report_type: str) -> str:
    importer_classes = {
        '.csv': CsvImporter,
        '.json': JsonImporter
    }

    if report_type not in ['simple', 'complete']:
        raise ValueError('Report type is invalid.')

    inventory = Inventory()

    for path in file_paths:
        for ext, importer_class in importer_classes.items():
            if path.endswith(ext):
                list_products = importer_class(path).import_data()
                inventory.add_data(data=list_products)

    return create_report(inventory, report_type)
