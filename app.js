function getOrders(){
  const data = localStorage.getItem('orders');
  return data ? JSON.parse(data) : [];
}

function saveOrder(order){
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}
