from typing import List
from inventory_report.inventory import Inventory
from inventory_report.reports.report import Report
from datetime import date
from collections import Counter

class SimpleReport(Report):
    DEFAULT_DATE = '9999-12-30'
    
    def __init__(self) -> None:
        self.inventories: List[Inventory] = []

    def add_inventory(self, inventory: Inventory) -> None:
        self.inventories.append(inventory)

    def generate(self) -> str:
        oldest_manufacture = self.get_oldest_manufacturing_date()
        closest_expire = self.get_closest_expiry_date()
        most_common_company = self.get_primary_company_name()

        report_lines = [
            f"Oldest manufacturing date: {oldest_manufacture}",
            f"Closest expiration date: {closest_expire}",
            f"Company with the largest inventory: {most_common_company}"
        ]
        return "\n".join(report_lines)

    def get_oldest_manufacturing_date(self) -> str:
        oldest_date = self.DEFAULT_DATE
        for inventory in self.inventories:
            for product in inventory._data:
                if product.manufacturing_date < oldest_date:
                    oldest_date = product.manufacturing_date
        return oldest_date

    def get_closest_expiry_date(self) -> str:
        today = date.today().isoformat()
        closest_date = self.DEFAULT_DATE
        for inventory in self.inventories:
            for product in inventory._data:
                if product.expiration_date > today and product.expiration_date < closest_date:
                    closest_date = product.expiration_date
        return closest_date

    def get_primary_company_name(self) -> str:
        companies = [product.company_name for inventory in self.inventories for product in inventory._data]
        most_common_company = Counter(companies).most_common(1)
        return most_common_company[0][0] if most_common_company else ""
