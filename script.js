document.addEventListener("DOMContentLoaded", () => {
    const cityData = {
      newyork: {
        food: ["Joe's Pizza", "Katz's Deli", "Shake Shack"],
        stay: ["Marriott Times Square", "The Plaza", "Pod 39"],
        places: ["Central Park", "Statue of Liberty", "Brooklyn Bridge"],
        background: "url('https://source.unsplash.com/1600x900/?newyork')"
      },
      paris: {
        food: ["Le Meurice", "Bistro Paul Bert", "Pierre Hermé"],
        stay: ["Hôtel Ritz", "Maison Souquet", "Hotel Le Meurice"],
        places: ["Eiffel Tower", "Louvre Museum", "Notre Dame"],
        background: "url('https://source.unsplash.com/1600x900/?paris')"
      },
      tokyo: {
        food: ["Ichiran Ramen", "Tsukiji Sushi", "Tendon Tenya"],
        stay: ["Park Hyatt", "Hotel Gracery", "Shinjuku Granbell"],
        places: ["Tokyo Tower", "Shibuya Crossing", "Ueno Park"],
        background: "url('https://source.unsplash.com/1600x900/?tokyo')"
      }
    };
  
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let particlesArray = [];
  
    class Particle {
      constructor(x, y, size, color, vx, vy) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
      }
  
      update() {
        this.x += this.vx;
        this.y += this.vy;
  
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
  
    function createParticles() {
      particlesArray = [];
      for (let i = 0; i < 80; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = `rgba(186, 85, 211, ${Math.random() * 0.5 + 0.3})`;
        let vx = (Math.random() - 0.5) * 0.8;
        let vy = (Math.random() - 0.5) * 0.8;
        particlesArray.push(new Particle(x, y, size, color, vx, vy));
      }
    }
  
    function animateParticles() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
  
    createParticles();
    animateParticles();
  
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    });
  
    const updateContent = (city) => {
      const data = cityData[city];
      document.body.style.backgroundImage = data.background;
      ["food", "stay", "places"].forEach((section) => {
        const ul = document.querySelector(`#${section} ul`);
        ul.innerHTML = "";
        data[section].forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
      });
    };
  
    const citySelect = document.getElementById("city-select");
    citySelect.addEventListener("change", (e) => updateContent(e.target.value));
    updateContent(citySelect.value); // Initial load
  });
  