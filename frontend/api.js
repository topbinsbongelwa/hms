const API_URL = "https://localhost:5001/api";

async function getPatients() {
  try {
    const response = await fetch(
      `${API_URL}/patients`
    );

    const data = await response.json();

    state.patients = data;

    renderPatients();

  } catch (error) {
    console.error(error);
  }
}

async function addPatient() {

  const patient = {
    name: document.getElementById("p-name").value,
    age: document.getElementById("p-age").value,
    condition: document.getElementById("p-condition").value
  };

  try {

    await fetch(
      `${API_URL}/patients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
      }
    );

    getPatients();

  } catch (error) {
    console.error(error);
  }
}

async function getAppointments() {

  const response = await fetch(
    `${API_URL}/appointments`
  );

  const data = await response.json();

  state.appointments = data;

  renderAppointments();

}

async function bookAppt() {

  const appointment = {
    patient:
      document.getElementById(
        "a-name"
      ).value,

    date:
      document.getElementById(
        "a-date"
      ).value
  };

  await fetch(
    `${API_URL}/appointments`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(
        appointment
      )
    }
  );

  getAppointments();

}

