const base = "https://expert-carnival-x5wv69jx547xc9pqw-6008.app.github.dev"; // replace with your actual backend URL

fetch(`${base}/locations`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#locationstable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.region}</td></tr>`;
    });
});

fetch(`${base}/reports`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#reportstable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr><td>${item.id}</td><td>${item.location_id}</td><td>${item.user_contact}</td><td>${item.issue_type}</td><td>${item.timestamp}</td></tr>`;
    });
});

fetch(`${base}/status_updates`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#statustable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr><td>${item.id}</td><td>${item.report_id}</td><td>${item.status}</td><td>${item.note}</td><td>${item.timestamp}</td></tr>`;
    });
});
