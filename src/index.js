// alt + shift + f    => Format the code

const app = document.getElementById("app");
const myForm = document.createElement("form");

myForm.setAttribute("id", "form");
app.appendChild(myForm);

fetch("src/data.json")
  .then((res) => res.json())
  .then((data) => {
    for (const objProp in data.contact) {
      const container = document.createElement("div");
      const label = document.createElement("label");
      const input = document.createElement("input");

      // Set container id into objProp
      container.className = "container main-box input-group input-group-sm";
      container.appendChild(label);

      label.className = "input-group-text bold";
      label.setAttribute("for", [objProp]);
      label.textContent = [objProp];

      input.id = [objProp];
      input.name = [objProp];
      input.className = "form-control";
      // Append container to the form
      form.appendChild(container);

      // Create dropdowns for the specialty, state lisence & nccpa
      if ([objProp] == "Specialty") {
        const select = document.createElement("select");
        select.id = [objProp];
        select.name = [objProp];
        select.className = "form-select";

        for (const prop in data.contact.Specialty) {
          for (const x in data.contact.Specialty[prop]) {
            // console.log(  data.contact.Specialty[prop][x]  ) => value
            const option = document.createElement("option");
            option.value = data.contact.Specialty[prop][x];
            option.innerHTML = data.contact.Specialty[prop][x];
            // Append select and option element to container.
            container.appendChild(select);
            select.appendChild(option);
            form.appendChild(container);
          }
        }
      } else {
        form.appendChild(container);
        container.appendChild(input);
      }
    }

    const submitBtn = document.createElement("button");
    const mainContainer = document.createElement("div");
    mainContainer.id = "main-container";
    submitBtn.innerHTML = "Click to generate notes below ";
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "btn btn-primary");
    myForm.appendChild(mainContainer);
    myForm.appendChild(submitBtn);
    /////////////////////////////

    const specialtyOpt = document.getElementById("Specialty");
    const mainCont = document.getElementById("main-container");

    specialtyOpt.addEventListener("change", () => {
      switch (specialtyOpt.value) {
        case "Physician Assistant":
          mainCont.innerHTML = "";
          switch_requirement(data.pa);
          tester2("Nccpa");
          break;
        case "Nurse Practitioner":
          mainCont.innerHTML = "";
          switch_requirement(data.np);

          break;
        case "Emergency Medical Technician":
          mainCont.innerHTML = "";
          switch_requirement(data.emt);
          tester2("Compact");
          break;
        case "Paramedic":
          mainCont.innerHTML = "";
          switch_requirement(data.emt);
          tester2("Compact");
          break;
        default:
          break;
      }
    });

    function switch_requirement(jsonObj) {
      for (const key in jsonObj) {
        const container = document.createElement("div");
        const label = document.createElement("label");
        const mainCont = document.getElementById("main-container");

        //Set dropDown States !!!
        dropDownStates("states", "State-License", key, container);

        // dropDownStates2("Nccpa", key, container);
        // dropDownStates2("Compact", key, container);
        mainContainer.appendChild(container);

        label.className = "input-group-text bold";
        label.setAttribute("for", [key]);
        label.textContent = [key];

        if ([key] == "Nccpa") {
          label.textContent = [key] + " is required";
        }

        if ([key] == "Compact") {
          label.textContent = "This's " + [key];
        }

        container.className = "container main-box input-group input-group-sm";
        container.appendChild(label);

        if ([key] == "Notes") {
          const input = document.createElement("INPUT");
          input.setAttribute("type", "text");
          input.id = [key];
          input.name = [key];
          input.className = "form-control";
          mainCont.appendChild(container);
          container.appendChild(input);

        }

        //   }
        for (const k in jsonObj[key]) {
          const box = document.createElement("div");
          const input = document.createElement("input");
          const span = document.createElement("span");
          box.className = "inp-box input-group-text";
          input.setAttribute("name", [key]);
          input.setAttribute("value", jsonObj[key][k]);
          input.setAttribute("type", "radio");

          function set_id(id) {
            if ([key] == id) {
              container.setAttribute("id", id);
              container.style.display = "none";
            }
          }
          set_id("Nccpa");
          set_id("Compact");

          function multiSelection(lbl) {
            if ([key] == lbl) {
              input.removeAttribute("name");
              input.setAttribute("type", "checkbox");
              container.setAttribute("id", lbl);
            }
          }
          multiSelection("Certificate");
          multiSelection("Experience");

          span.className = "input ";
          span.textContent = jsonObj[key][k];
          //Append elements
          box.appendChild(span);
          box.appendChild(input);
          container.appendChild(box);
          mainCont.appendChild(container);
          myForm.insertBefore(mainContainer, submitBtn);
        }
      }
    }
  });

function tester2(obj) {
  fetch("src/states.json")
    .then((res) => res.json())
    .then((data) => {
      let x = Object.keys(data[obj]);

      const stateSlt = document.getElementById("State-License");
      const check = document.getElementsByName(obj);
      const ida = document.getElementById(obj);

      stateSlt.addEventListener("change", () => {
        const result = x.find((e) => {
          return stateSlt.value == e;
        });
        if (result !== undefined) {
          ida.style.display = "flex";
          //check[0].disabled = true;
          //check[1].disabled = false;
          //check[0].checked = false;
          //check[1].checked = true;
        } else {
          ida.style.display = "none";
          //check[0].disabled = false;
          //check[1].disabled = true;
          //check[0].checked = true;
          //check[1].checked = false;
        }
      });
    });
}

const form = document.getElementById("form");
const myPrompt = document.getElementById("prompt");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cert = document
    .getElementById("Certificate")
    .getElementsByTagName("input");
  let certificationsTxt = "Certifications : ";

  for (const prop in cert) {
    if (cert[prop].checked == true) {
      certificationsTxt += ` ${cert[prop].value}, `;
    }
  }

  const exp = document
    .getElementById("Experience")
    .getElementsByTagName("input");
  let experienceTxt = "Experience : ";

  for (const prop in exp) {
    if (exp[prop].checked == true) {
      experienceTxt += ` ${exp[prop].value}, `;
    }
  }

  const result = new FormData(form);
  let x = [...result];
  let promp = "";

  x.forEach(function (y) {
    promp += `  ${y[0]} : ${y[1]}  <br>`;
  });
  myPrompt.innerHTML = `${promp} <br> ${certificationsTxt} <br> ${experienceTxt}`;
});

function dropDownStates(states, str, prop, container) {
  if ([prop] == str) {
    fetch("src/states.json")
      .then((res) => res.json())
      .then((data) => {
        const select = document.createElement("select");
        select.id = [prop];
        select.name = [prop];
        select.className = "form-select";
        for (const state in data[states]) {
          const option = document.createElement("option");
          option.value = [state];
          option.innerHTML = `${state}. ${data[states][state]}`;
          select.appendChild(option);
          container.appendChild(select);
        }
      });
  }
}

function dropDownStates2(states, prop, container) {
  if ([prop] == states) {
    fetch("src/states.json")
      .then((res) => res.json())
      .then((data) => {
        const select = document.createElement("select");
        select.className = "form-select";
        for (const state in data[states]) {
          const option = document.createElement("option");
          option.value = [state];
          option.innerHTML = `${state}. ${data[states][state]}`;
          select.appendChild(option);
          container.appendChild(select);
        }
      });
  }
}
