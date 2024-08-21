const weatherForm = document.querySelector('form');
const locationElement = document.getElementById('location');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const address = locationElement.value;
    
    const url = `/weather?address=${encodeURIComponent(address)}`;

    locationElement.value = '';
    message1.innerText = 'Loading...';
    message2.innerText = '';

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if (data.error) return message1.innerText = data.error;

            message1.innerText = data.location;
            message2.innerText = data.forecast;
        });
    });
});