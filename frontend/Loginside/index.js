async function login() {
  const emailVal = document.getElementById('emailInput').value
  const passVal = document.getElementById('passwordInput').value
  const error = document.getElementById('error')

  if (!emailVal || !passVal) return

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailVal, password: passVal })
    })
    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      window.location.href = '../main/main.html'
    } else {
      error.innerText = data.message
      error.style.display = 'block'
    }
  } catch (err) {
    error.innerText = err.message
    error.style.display = 'block'
  }
}
