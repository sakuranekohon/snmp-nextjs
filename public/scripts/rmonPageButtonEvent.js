
export function getrmonTable() {
    var targetIP = document.getElementById('targetIP').value;
    var rmonOID = "1.3.6.1.2.1.16.1";
    var searchData = {
        targetIP: targetIP,
        OID: rmonOID,
    }
    console.log(searchData)
    fetch("/api/rmon", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("API Response:", data);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
}