// I still doubt that this is going to work, unless I hear back from a representative
// They denied my application and we DO need a valid API key

var request = new XMLHttpRequest();

request.open('POST', 'https://represent.com/api/fulfilment/orders?buyGift=' + link);

request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', 'Bearer your_api_key');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
    'type': 'order',
    'reference': '<your-reference-id>',
    'products': [
        {
            'product_id': 12345
            'variant_id': 'black',
            'size': 'M',
            'quantity': 1
        },
        {
            'product_id': 12345
            'variant_id': 'white',
            'size': 'S',
            'quantity': 1
        }
    ],
    'to_address': {
        'full_name': 'John Doe',
        'shipping1': '1680 Vine St',
        'shipping2': 'Suite 400',
        'city': 'Los Angeles',
        'zip': '90028',
        'state': 'CA',
        'country': 'US'
    }
};

request.send(JSON.stringify(body));
