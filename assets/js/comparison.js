// Mock data for demo purposes
const carInventory = [
    {
        id: 1,
        title: 'Toyota Land Cruiser',
        condition: 'New',
        category: 'SUV',
        type: 'SUV',
        color: 'White Pearl',
        door: '5 Doors',
        vin: 'TLC202415',
        offerType: 'Premium',
        price: '$85,000.00',
        length: '4950mm',
        height: '1945mm',
        width: '1980mm',
        wheelbase: '2850mm',
        image: 'assets/img/featured/featured-1-1.jpg',
        dealer: 'DriveMaroc Premium Motors'
    },
    {
        id: 2,
        title: 'Mercedes-Benz C-Class',
        condition: 'New',
        category: 'Sedan',
        type: 'Sedan',
        color: 'Obsidian Black',
        door: '4 Doors',
        vin: 'MBC202415',
        offerType: 'Featured',
        price: '$45,000.00',
        length: '4750mm',
        height: '1440mm',
        width: '1820mm',
        wheelbase: '2865mm',
        image: 'assets/img/featured/featured-1-2.jpg',
        dealer: 'DriveMaroc Luxury Auto'
    },
    {
        id: 3,
        title: 'BMW X5',
        condition: 'New',
        category: 'SUV',
        type: 'SUV',
        color: 'Mineral White',
        door: '5 Doors',
        vin: 'BMW202415',
        offerType: 'Premium',
        price: '$65,000.00',
        length: '4922mm',
        height: '1745mm',
        width: '2004mm',
        wheelbase: '2975mm',
        image: 'assets/img/featured/featured-1-3.jpg',
        dealer: 'DriveMaroc Premium Motors'
    }
];

let selectedCars = [];
const maxComparisons = 3;

function addCarToCompare() {
    if (selectedCars.length >= maxComparisons) {
        alert('You can compare up to 3 vehicles at a time');
        return;
    }

    // Simulate selecting a car from inventory
    const availableCars = carInventory.filter(car => 
        !selectedCars.find(selected => selected.id === car.id)
    );

    if (availableCars.length === 0) {
        alert('No more cars available to compare');
        return;
    }

    // Add the first available car
    const car = availableCars[0];
    selectedCars.push(car);
    updateComparisonTable();
}

function removeCarFromCompare(carId) {
    selectedCars = selectedCars.filter(car => car.id !== carId);
    updateComparisonTable();
}

function updateComparison() {
    const rows = document.querySelectorAll('.compare-item-wrap');
    const features = [
        'title', 'condition', 'category', 'type', 'color', 'door',
        'vin', 'offerType', 'price', 'length', 'height', 'width', 'wheelbase'
    ];

    features.forEach((feature, index) => {
        const row = document.querySelector(`[data-feature="${feature}"]`);
        if (row) {
            const cells = row.querySelectorAll('.col-lg-4:not(:first-child)');
            cells.forEach((cell, cellIndex) => {
                if (selectedCars[cellIndex]) {
                    cell.querySelector('.title').textContent = selectedCars[cellIndex][feature] || '';
                } else {
                    cell.querySelector('.title').textContent = '';
                }
            });
        }
    });

    // Update comparison container
    const compareContainer = document.querySelector('.row.gy-4.mb-4.justify-content-center');
    if (compareContainer) {
        let html = `
            <div class="col-lg-4 col-md-6">
                <div class="title-area mt-4 pt-lg-4">
                    <h2 class="sec-title">Feature Vehicles Comparison</h2>
                </div>
            </div>
        `;

        selectedCars.forEach(car => {
            html += `
                <div class="col-lg-4 col-md-6">
                    <div class="feature-list-1 compare">
                        <div class="box-icon">
                            <img src="${car.image}" alt="${car.title}" />
                            <div class="actions">
                                <a href="#" class="icon-btn" onclick="removeCarFromCompare(${car.id}); return false;">
                                    <i class="fa-solid fa-trash-can"></i>
                                </a>
                            </div>
                        </div>
                        <div class="car-content">
                            <div class="media-body">
                                <h3 class="box-title">
                                    <a href="#">${car.title}</a>
                                </h3>
                                <p class="box-text">
                                    <span>Listed by:</span> ${car.dealer}
                                </p>
                            </div>
                            <div class="car-bottom">
                                <h6 class="box-title">${car.price}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        if (selectedCars.length < maxComparisons) {
            html += `
                <div class="col-lg-4 col-md-6">
                    <div class="add-compare-wrap" onclick="addCarToCompare()">
                        <div class="add-compare">
                            <div class="compare-icon">
                                <img src="assets/img/icon/compare-icon.svg" alt="icon" />
                            </div>
                        </div>
                        <p class="box-text mt-4 text-center">Add Car to Compare</p>
                    </div>
                </div>
            `;
        }

        compareContainer.innerHTML = html;
    }
}

// Initialize comparison on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add data-feature attributes to rows
    const features = [
        'title', 'condition', 'category', 'type', 'color', 'door',
        'vin', 'offerType', 'price', 'length', 'height', 'width', 'wheelbase'
    ];
    
    document.querySelectorAll('.row.gy-4.mb-4, .row.gy-3.mb-3').forEach((row, index) => {
        if (index < features.length) {
            row.setAttribute('data-feature', features[index]);
        }
    });

    updateComparison();
});

// Add animation class to newly added cars
function animateComparison() {
    const cards = document.querySelectorAll('.car-details');
    cards.forEach(card => {
        card.classList.add('as-fade-in');
    });
}

// Helper function to format currency
function formatCurrency(price) {
    return price.startsWith('$') ? price : `$${price}`;
}

// Helper function to format specifications
function formatSpec(value) {
    return value || 'N/A';
}