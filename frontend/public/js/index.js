async function login() {
  const emailVal = document.getElementById('emailInput').value
  const passVal = document.getElementById('passwordInput').value
  const error = document.getElementById('error')

  if (!emailVal || !passVal) return

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ email: emailVal, password: passVal })
    })
    const data = await response.json()

    if (response.ok) {
      localStorage.setItem('token', data.token)
      window.location.href = '/main/groups'
    } else {
      error.innerText = data.message
      error.style.display = 'block'
    }
  } catch (err) {
    error.innerText = err.message
    error.style.display = 'block'
  }
}

async function register() {
  const username = document.getElementById('usernameInput')
  const email = document.getElementById('emailInput')
  const password = document.getElementById('passwordInput')
  const error = document.getElementById('error')

  async function register() {

    const usernameVal = username.value
    const emailVal = email.value
    const passVal = password.value

    if (!emailVal || !passVal || !usernameVal) return

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal, password: passVal, username: usernameVal })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Bruger oprettet! Log ind nu.')
      } else {
        error.innerText = data.message
        error.style.display = 'block'
      }
    } catch (err) {
      error.innerText = err.message
      error.style.display = 'block'
    }
  }
}