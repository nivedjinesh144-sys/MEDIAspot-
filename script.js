// --- Demo product data ---
const PRODUCTS = [
  {id:1,title:'trophy1',price:129,category:'trophies ',img:'![WhatsApp Image 2025-08-16 at 19 28 27_6d89ed07](https://github.com/user-attachments/assets/190367d5-fade-4bcb-88e8-3c43dd5f2a67)
',rating:4.6},
  {id:2,title:'trophy2',price:449,category:'trophies ',img:'https://promotionalwears.com/image/cache/catalog/data/Trophies/custom-trophy/achievement-cup-trophies-500x500.webp',rating:4.2},
  {id:3,title:'momento1',price:619,category:'momento',img:'https://cpimg.tistatic.com/10224040/b/4/Metal-Wooden-Shield-Trophies-3-PCS-Set..jpg',rating:4.4},
  {id:4,title:'trophy4',price:579,category:'trophies ',img:'https://joytreeglobal.com/wp-content/uploads/Customized-7-Star-Corporate-Award-Trophy-copy.webp_1.webp',rating:4.5},
  {id:5,title:'trophy5',price:624,category:'trophies ',img:'https://artright.in/wp-content/uploads/2024/09/Untitled-1-scaled.jpg',rating:4.1},
  {id:6,title:'trophy6',price:799,category:'trophies ',img:'https://images.jdmagicbox.com/quickquotes/images_main/diamond-trophies-2008268411-59ogoe1z.jpg',rating:4.8},
  {id:7,title:'trophy7',price:129,category:'trophies ',img:'https://merutrophy.in/cdn/shop/files/gold-metal-trophy-133_d6f16cdd-74f2-4b42-872d-589a8d3d674d.png?v=1753966530',rating:4.6},
  {id:8,title:'trophy8',price:449,category:'trophies ',img:'https://promotionalwears.com/image/cache/catalog/data/Trophies/custom-trophy/achievement-cup-trophies-500x500.webp',rating:4.2},
  {id:9,title:'momento2',price:619,category:'momento',img:'https://cpimg.tistatic.com/10224040/b/4/Metal-Wooden-Shield-Trophies-3-PCS-Set..jpg',rating:4.4},
  {id:10,title:'trophy10',price:579,category:'trophies ',img:'https://joytreeglobal.com/wp-content/uploads/Customized-7-Star-Corporate-Award-Trophy-copy.webp_1.webp',rating:4.5},
  {id:11,title:'trophy11',price:624,category:'trophies ',img:'https://artright.in/wp-content/uploads/2024/09/Untitled-1-scaled.jpg',rating:4.1},
  {id:12,title:'trophy12',price:799,category:'trophies ',img:'https://images.jdmagicbox.com/quickquotes/images_main/diamond-trophies-2008268411-59ogoe1z.jpg',rating:4.8},
  {id:13,title:'trophy13',price:129,category:'trophies ',img:'https://merutrophy.in/cdn/shop/files/gold-metal-trophy-133_d6f16cdd-74f2-4b42-872d-589a8d3d674d.png?v=1753966530',rating:4.6},
  {id:14,title:'troph14',price:449,category:'trophies ',img:'https://promotionalwears.com/image/cache/catalog/data/Trophies/custom-trophy/achievement-cup-trophies-500x500.webp',rating:4.2},
  {id:15,title:'momento3',price:619,category:'momento',img:'https://cpimg.tistatic.com/10224040/b/4/Metal-Wooden-Shield-Trophies-3-PCS-Set..jpg',rating:4.4},
  {id:16,title:'trophy16',price:579,category:'trophies ',img:'https://joytreeglobal.com/wp-content/uploads/Customized-7-Star-Corporate-Award-Trophy-copy.webp_1.webp',rating:4.5},
  {id:17,title:'trophy17',price:624,category:'trophies ',img:'https://artright.in/wp-content/uploads/2024/09/Untitled-1-scaled.jpg',rating:4.1},
  {id:18,title:'trophy18',price:799,category:'trophies ',img:'https://images.jdmagicbox.com/quickquotes/images_main/diamond-trophies-2008268411-59ogoe1z.jpg',rating:4.8},
];

// --- State & helpers ---
const $ = id => document.getElementById(id);
let cart = JSON.parse(localStorage.getItem('MEDIAspot_cart')||'{}');

function saveCart(){localStorage.setItem('MEDIAspot_cart', JSON.stringify(cart)); updateCartUI();}
function formatted(n){return n.toLocaleString(undefined,{style:'currency',currency:'INR'})}

// --- Render products ---
function renderProducts(){
  const grid = $('productGrid'); grid.innerHTML='';
  const term = $('searchInput').value.trim().toLowerCase();
  const cat = $('categorySelect').value; 
  const sort = $('sortSelect').value;
  let list = PRODUCTS.filter(p=> (cat==='all'||p.category===cat) && (p.title.toLowerCase().includes(term) ) );
  if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  $('resultCount').textContent = list.length;
  list.forEach(p=>{
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `
      <div class="media"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
      <div style="flex:1;display:flex;flex-direction:column">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:700">${p.title}</div>
          <div class="price">${formatted(p.price)}</div>
        </div>
        <div class="muted">${p.category} • ${p.rating}★</div>
        <div style="margin-top:10px;display:flex;gap:8px">
          <button class="btn" data-id="${p.id}" data-action="quick">Quick view</button>
          <button class="btn btn-primary" data-id="${p.id}" data-action="buy">Buy Now</button>
        </div>
      </div>`;
    grid.appendChild(el);
  })
}

// --- Cart UI ---
function updateCartUI(){
  const count = Object.values(cart).reduce((s,x)=>s+x.qty,0);
  const total = Object.values(cart).reduce((s,x)=>s + x.qty * x.price,0);
  const badge = $('cartCount');
  if(count>0){badge.style.display='block'; badge.textContent = count;} 
  else badge.style.display='none';

  const panel = $('cartPanel');
  if(panel.style.display==='none') return;
  panel.innerHTML='';
  const wrapper = document.createElement('div'); wrapper.className='cart-panel';
  const list = document.createElement('div');
  Object.values(cart).forEach(item=>{
    const row = document.createElement('div'); row.className='cart-item';
    row.innerHTML = `<img src="${item.img}"/><div style="flex:1"><div style="font-weight:600">${item.title}</div><div class="muted">${formatted(item.price)} × ${item.qty}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="btn" data-id="${item.id}" data-action="inc">+</button><button class="btn" data-id="${item.id}" data-action="dec">−</button></div>`;
    list.appendChild(row);
  })
  const footer = document.createElement('div'); 
  footer.style.marginTop='12px'; 
  footer.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700">Subtotal</div><div style="font-weight:700">${formatted(total)}</div></div><div style="margin-top:10px;display:flex;gap:8px;justify-content:flex-end"><button id="continueShopping" class="btn">Continue</button><button id="checkoutBtn" class="btn btn-primary">Checkout</button></div>`;
  wrapper.appendChild(list); wrapper.appendChild(footer); panel.appendChild(wrapper);

  panel.querySelectorAll('button[data-action]').forEach(btn=>btn.addEventListener('click',onCartAction));
  $('checkoutBtn')?.addEventListener('click',openCheckout);
  $('continueShopping')?.addEventListener('click',closeCart);
}

function onCartAction(e){ 
  const id = e.target.dataset.id; 
  const action = e.target.dataset.action; 
  if(!id) return; 
  const item = cart[id]; 
  if(action==='inc'){item.qty++; saveCart()} 
  if(action==='dec'){item.qty--; if(item.qty<=0) delete cart[id]; saveCart()} 
  if(action==='quick'){openQuickView(id)} 
}

function addToCart(prodId, qty=1){ 
  const p = PRODUCTS.find(x=>x.id==prodId); 
  if(!p) return; 
  if(cart[p.id]) cart[p.id].qty += qty; 
  else cart[p.id] = {id:p.id,title:p.title,price:p.price,qty:qty,img:p.img}; 
  saveCart(); 
}

function openCart(){ $('cartPanel').style.display='block'; updateCartUI(); }
function closeCart(){ $('cartPanel').style.display='none'; }

// Quick View
function openQuickView(id){ 
  const p = PRODUCTS.find(x=>x.id==id); 
  if(!p) return; 
  const modal = document.createElement('div'); 
  modal.style = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,6,23,.5);z-index:90'; 
  modal.innerHTML = `<div style="background:#fff;padding:18px;border-radius:12px;max-width:720px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:12px"><div><img src='${p.img}' style='width:100%;height:320px;object-fit:cover;border-radius:8px'/></div><div><h3 style='margin-top:0'>${p.title}</h3><div class='muted'>${p.category} • ${p.rating}★</div><p style='font-weight:700;margin-top:10px'>${formatted(p.price)}</p><div style='margin-top:12px;display:flex;gap:8px'><button id='qAdd' class='btn btn-primary'>Add to cart</button><button id='qClose' class='btn'>Close</button></div></div></div>`;
  document.body.appendChild(modal);
  modal.querySelector('#qClose').addEventListener('click',()=>modal.remove());
  modal.querySelector('#qAdd').addEventListener('click',()=>{addToCart(p.id,1); modal.remove(); openCart();});
}

// Checkout
function openCheckout(){ $('checkoutModal').style.display='flex'; }
function closeCheckout(){ $('checkoutModal').style.display='none'; }

// Events
document.addEventListener('click', e=>{
  if(e.target.matches('#openCart')) openCart();
  if(e.target.matches('#cancelCheckout')) closeCheckout();
  if(e.target.matches('#continueShopping')) closeCart();
  if(e.target.matches('button[data-action="buy"]')) { addToCart(e.target.dataset.id,1); openCart(); }
  if(e.target.matches('button[data-action="quick"]')) openQuickView(e.target.dataset.id);
});
$('searchInput').addEventListener('input', renderProducts);
$('categorySelect').addEventListener('change', renderProducts);
$('sortSelect').addEventListener('change', renderProducts);

// WhatsApp Order
function sendToWhatsApp(order) {
  const phone = "919048658170";
  let text = `🧾 *New Order* %0A%0A`;
  text += order.items.map(i =>
    `• ${i.title} x${i.qty} = ₹${(i.qty*i.price).toFixed(2)}`
  ).join('%0A');
  text += `%0A%0A*Total:* ₹${order.total.toFixed(2)}%0A%0A`;
  text += `👤 *Customer:* ${order.customer.name}%0A`;
  text += `📍 *Address:* ${order.customer.address}, ${order.customer.city} - ${order.customer.postal}%0A`;
  text += `📩 *Email:* ${order.customer.email}`;
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank");
}

// Checkout submit
$('checkoutForm').addEventListener('submit', e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const order = {
    id:Date.now(),
    customer:data,
    items:Object.values(cart),
    total:Object.values(cart).reduce((s,i)=>s+i.qty*i.price,0)
  };
  sendToWhatsApp(order);
  cart = {}; saveCart(); closeCheckout(); closeCart();
});

// Initialize
renderProducts(); 
updateCartUI();









