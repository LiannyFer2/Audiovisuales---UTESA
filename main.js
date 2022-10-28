const form = document.getElementById("main-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const payload = new FormData(form)

  console.log([...payload])
})
