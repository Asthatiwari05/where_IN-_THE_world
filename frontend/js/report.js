document.getElementById("reportForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("itemName", document.getElementById("itemName").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("location", document.getElementById("location").value);
    formData.append("type", localStorage.getItem("reportType"));
    formData.append("image", document.getElementById("image").files[0]);

    try {
        const response = await fetch("http://localhost:5000/api/items/report", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("✓ Item reported successfully! Thank you for helping someone recover their item.");
            window.location.href = "index.html";
        } else {
            alert("Error: " + (data.error || "Could not report item"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error reporting item. Please try again.");
    }
});