fetch("/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
body: JSON.stringify({ email: emailVal, password: passVal })
});


async function register() {
    const emailVal = email.value
    const passVal = password.value


    if (!emailVal || !passVal ) return

    try {
        const response = await fetch(apiBase + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: emailVal, password: passVal })
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