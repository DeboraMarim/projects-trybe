from inventory_report.product import Product

def test_create_product() -> None:
    product_data = {
        'id': '1',
        'product_name': 'Nicotine Polacrilex',
        'company_name': 'Target Corporation',
        'manufacturing_date': '2021-02-18',
        'expiration_date': '2024-09-17',
        'serial_number': 'CR25 1551 4467 2549 4402 1',
        'storage_instructions': 'instrucao 1'
    }

    product = Product(**product_data)

    for attribute, expected_value in product_data.items():
        assert getattr(product, attribute) == expected_value
