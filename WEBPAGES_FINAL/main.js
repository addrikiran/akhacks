document.addEventListener('DOMContentLoaded', function() {
  const authToken = 'DJgAqFG4bEqa-dMtpR6UocNK-5r8HJcr';  // Replace with your Blynk Auth Token
  const slots = [0, 1, 2, 3];  // Assuming you have 4 virtual pins for 4 slots
  const urls = slots.map(slot => `https://blr1.blynk.cloud/external/api/get?token=${authToken}&V${slot}`);

  async function fetchData() {
    try {
      let responses = await Promise.all(urls.map(url => fetch(url)));
      let data = await Promise.all(responses.map(response => response.json()));
      displayData(data);
    } catch (error) {
      console.error('Error fetching data from Blynk:', error);
    }
  }

  function displayData(data) {
    data.forEach((status, index) => {
      const slotNumber = index + 1;
      const cell = document.getElementById(`slot${slotNumber}`);
      if (cell) {
        cell.textContent = status === 0 ? 'Occupied' : 'Available';
      }
    });
  }

  // Fetch data initially and set an interval to update it periodically
  fetchData();
  setInterval(fetchData, 5000);  // Update every 5 seconds
});
