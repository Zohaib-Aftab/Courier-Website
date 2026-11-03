const cities = [
    "Dalmian",
    "Malir",
    "Landhi",
    "Cantt",
    "Defence",
    "FB Area",
    "Saddar"
];
const distances = [
    [0, 10, 15, 20, 25, 30, 35],
    [10, 0, 18, 22, 28, 26, 32],
    [15, 18, 0, 12, 20, 24, 30],
    [20, 22, 12, 0, 14, 18, 26],
    [25, 28, 20, 14, 0, 16, 22],
    [30, 26, 24, 18, 16, 0, 12],
    [35, 32, 30, 26, 22, 12, 0]
];

const positions = [
    {x:120, y:200},   // Dalmian
    {x:260, y:80},    // Malir
    {x:420, y:100},   // Landhi
    {x:560, y:200},   // Cantt
    {x:420, y:320},   // Defence
    {x:260, y:340},   // FB Area
    {x:600, y:90}     // Saddar
];

const svg = document.getElementById("graph");
const startCitySelect = document.getElementById("startCity");
const routeText = document.getElementById("routeText");
const distanceText = document.getElementById("distanceText");

// Populate dropdown
cities.forEach((city, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = city;
    startCitySelect.appendChild(option);
});

function drawGraph() {
    svg.innerHTML = "";
    for (let i = 0; i < cities.length; i++) {
        for (let j = i + 1; j < cities.length; j++) {
            const x1 = positions[i].x;
            const y1 = positions[i].y;
            const x2 = positions[j].x;
            const y2 = positions[j].y;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", "#bbb");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);

            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", (x1 + x2) / 2);
            text.setAttribute("y", (y1 + y2) / 2);
            text.setAttribute("fill", "#555");
            text.setAttribute("font-size", "12");
            text.setAttribute("text-anchor", "middle");
            text.textContent = distances[i][j];
            svg.appendChild(text);
        }
    }

    cities.forEach((city, i) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", positions[i].x);
        circle.setAttribute("cy", positions[i].y);
        circle.setAttribute("r", 28);
        circle.setAttribute("fill", "#2a5298");
        svg.appendChild(circle);

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", positions[i].x);
        label.setAttribute("y", positions[i].y + 4);
        label.setAttribute("fill", "white");
        label.setAttribute("font-size", "11");
        label.setAttribute("text-anchor", "middle");
        label.textContent = city;
        svg.appendChild(label);
    });
}

function permutations(arr) {
    if (arr.length === 0) return [[]];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        for (const perm of permutations(rest)) {
            result.push([arr[i], ...perm]);
        }
    }
    return result;
}

function calculateTSP(start) {
    const remaining = cities.map((_, i) => i).filter(i => i !== start);
    const perms = permutations(remaining);

    let minDistance = Infinity;
    let bestRoute = [];

    perms.forEach(route => {
        let total = 0;
        let current = start;

        route.forEach(city => {
            total += distances[current][city];
            current = city;
        });

        total += distances[current][start];

        if (total < minDistance) {
            minDistance = total;
            bestRoute = [start, ...route, start];
        }
    });

    return { bestRoute, minDistance };
}

document.getElementById("calculateBtn").onclick = () => {
    const start = parseInt(startCitySelect.value);
    const result = calculateTSP(start);

    const routeNames = result.bestRoute.map(i => cities[i]).join(" → ");
    routeText.textContent = "Route: " + routeNames;
    distanceText.textContent = "Total Distance: " + result.minDistance + " KM";
};

drawGraph();
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "admin-dashboard.html";
  }
}

