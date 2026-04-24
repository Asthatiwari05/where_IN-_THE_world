let allItems = [];

function goToReport(type) {
    localStorage.setItem("reportType", type);
    window.location.href = "report.html";
}

async function loadItems() {
    try {
        const res = await fetch("http://localhost:5000/api/items");
        allItems = await res.json();
        displayItems(allItems);
    } catch (err) {
        console.error("Error loading items:", err);
        document.getElementById("items").innerHTML = "<p class='text-red-400'>Error loading items</p>";
    }
}

function displayItems(items) {
    const container = document.getElementById("items");
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p class='col-span-full text-center text-gray-400'>No items found</p>";
        return;
    }

    items.forEach(item => {
        const typeColor = item.type === "lost" ? "text-red-400" : "text-green-400";
        const typeBadge = item.type === "lost" ? "Lost" : "Found";
        
        container.innerHTML += `
            <div class="bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/30 transition">
                <img src="http://localhost:5000/uploads/${item.image}"
                    class="w-full h-48 object-cover rounded-lg mb-4"
                    onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">

                <div class="flex items-center justify-between mb-2">
                    <h2 class="text-xl font-bold">${item.itemName}</h2>
                    <span class="${typeColor} text-xs font-semibold px-2 py-1 bg-white/10 rounded">${typeBadge}</span>
                </div>
                
                <p class="text-sm text-gray-300 mb-2">${item.description}</p>
                
                <div class="text-xs text-gray-400 space-y-1 mb-4">
                    <p><strong>Location:</strong> ${item.location}</p>
                    <p><strong>Reported by:</strong> ${item.name}</p>
                    <p><strong>Contact:</strong> ${item.phone}</p>
                </div>

                <button 
                    onclick="openMessageModal('${item._id}')"
                    class="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition">
                    Message Owner
                </button>
            </div>
        `;
    });
}

function filterItems() {
    const searchTerm = document.getElementById("search").value.toLowerCase();

    if (searchTerm.trim() === "") {
        displayItems(allItems);
        return;
    }

    const filtered = allItems.filter(item => 
        item.itemName.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
    );

    displayItems(filtered);
}

function openMessageModal(itemId) {
    const modal = document.getElementById("messageModal");
    modal.dataset.itemId = itemId;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeMessageModal() {
    const modal = document.getElementById("messageModal");
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
    const modal = document.getElementById("messageModal");
    if (e.target === modal) {
        closeMessageModal();
    }
});

async function sendMessage() {
    const modal = document.getElementById("messageModal");
    const itemId = modal.dataset.itemId;
    
    const senderName = document.getElementById("senderName").value;
    const senderPhone = document.getElementById("senderPhone").value;
    const message = document.getElementById("messageText").value;

    if (!senderName || !senderPhone || !message) {
        alert("Please fill in all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/messages/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                itemId,
                senderName,
                senderPhone,
                message
            })
        });

        const data = await res.json();
        
        if (res.ok) {
            alert("Message sent successfully!");
            document.getElementById("messageForm").reset();
            closeMessageModal();
        } else {
            alert("Error: " + (data.error || "Could not send message"));
        }
    } catch (err) {
        console.error("Error sending message:", err);
        alert("Error sending message");
    }
}

loadItems();
setInterval(loadItems, 10000);