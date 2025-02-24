from typing import Counter as TypingCounter
from inventory_report.reports.simple_report import SimpleReport
from datetime import date
from collections import Counter

class CompleteReport(SimpleReport):
    def generate(self) -> str:
        today = date.today().isoformat()

        oldest_manufacture = self.get_oldest_manufacture_date()
        closest_expire = self.get_closest_expiration_date(today)
        companies_counter = self.get_companies_counter()

        company_name = f"{companies_counter.most_common(1)[0][0]}\n"
        oldest = f"Oldest manufacturing date: {oldest_manufacture}\n"
        expiration = f"Closest expiration date: {closest_expire}\n"
        largest = f"Company with the largest inventory: {company_name}"
        stocks = "Stocked products by company:\n" + "".join(
            [f"- {name}: {qnt}\n" for name, qnt in companies_counter.items()]
        )

        return oldest + expiration + largest + stocks

    def get_oldest_manufacture_date(self) -> str:
        return min(
            (product.manufacturing_date for inventory in self.inventories for product in inventory._data),
            default='9999-12-30'
        )

    def get_closest_expiration_date(self, today: str) -> str:
        valid_dates = [
            product.expiration_date for inventory in self.inventories for product in inventory._data
            if product.expiration_date > today
        ]
        return min(valid_dates, default='9999-12-30')

    def get_companies_counter(self) -> TypingCounter[str]:
        companies_names = [
            product.company_name for inventory in self.inventories for product in inventory._data
        ]
        return Counter(companies_names)
