// encriptador/desencriptador de texto

// Operaciones comunes en elementos HTML
function manipulateElement(selector, action, value = "") {
    const elementHTML = document.querySelector(selector);
    if (elementHTML) {
      switch (action) {
        case "assignText":
          elementHTML.innerHTML = value;
          break;
        case "hide":
          elementHTML.style.display = "none";
          break;
        case "show":
          elementHTML.style.display = "block";
          break;
        case "setValue":
          elementHTML.value = value;
          break;
        case "getValue":
          return elementHTML.value.toLowerCase();
      }
    }
    return null;
  }
  
  // Asignar texto al campo de salida y ajustar visibilidad de otros elementos
  function setOutputText(text) {
    manipulateElement(".output-section__message", "setValue", text);
    manipulateElement(".btn--copy", "show");
    manipulateElement(".output-section__message", "show");
    manipulateElement(".boneco", "hide");
    manipulateElement(".message1", "hide");
    manipulateElement(".message2", "hide");
  }
  
  // Mostrar el mensaje inicial
  function showInit() {
    manipulateElement(".output-section__message", "hide");
    manipulateElement(".btn--copy", "hide");
    manipulateElement(".boneco", "show");
    manipulateElement(".message1", "show");
    manipulateElement(".message2", "show");
  }
  
  // Obtener el texto de entrada
  function getInputText() {
    return manipulateElement(".input-section__text-area", "getValue");
  }
  
  // Encriptar o desencriptar el texto basado en los reemplazos proporcionados
  function encryptDecrypt(text, replacements) {
    return replacements.reduce((result, [original, replacement]) => {
      const regex = new RegExp(original, "gi");
      return result.replace(regex, replacement);
    }, text);
  }
  
  // Funciones para encriptar y desencriptar
  function btnEncrypt() {
    const text = getInputText();
    const replacements = [
      ["e", "enter"],
      ["i", "imes"],
      ["a", "ai"],
      ["o", "ober"],
      ["u", "ufat"],
    ];
    setOutputText(encryptDecrypt(text, replacements));
  }
  
  function btnDecrypt() {
    const text = getInputText();
    const replacements = [
      ["enter", "e"],
      ["imes", "i"],
      ["ai", "a"],
      ["ober", "o"],
      ["ufat", "u"],
    ];
    setOutputText(encryptDecrypt(text, replacements));
  }
  
  // Copiar el texto de salida al portapapeles
  function btnCopy() {
    const text = manipulateElement(".output-section__message", "getValue");
    if (text) {
      navigator.clipboard.writeText(text);
      console.log("Copy text: " + text);
      Swal.fire({
        title: "¡Texto copiado con éxito!",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#f3f5fc",
        backdrop: `
      rgba(0,0,123,0.4)
    `,
      });
    }
  }
  
  // Limpiar los campos de texto y restablecer el estado inicial
  function btnClear() {
    manipulateElement(".input-section__text-area", "setValue", "");
    manipulateElement(".output-section__message", "setValue", "");
    showInit();
    manipulateElement(".btn--copy", "hide");
    manipulateElement(".boneco", "show");
    manipulateElement(".message1", "show");
    manipulateElement(".message2", "show");
  }
  
  // Inicializar la página
  showInit();
  