from inventory_report.product import Product

def test_product_report() -> None:
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

    response_template = (
        "The product {id} - {product_name} "
        "with serial number {serial_number} "
        "manufactured on {manufacturing_date} "
        "by the company {company_name} "
        "valid until {expiration_date} "
        "must be stored according to the following instructions: "
        "{storage_instructions}."
    )
    
    assert str(product) == response_template.format(**product_data)
