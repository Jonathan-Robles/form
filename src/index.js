// alt + shift + f    => Format the code

//import "./styles.css";
// const URL_BASE = "https://jonathan-robles.github.io/api/txt.json";
const URL_BASE = "https://jonathan-robles.github.io/api/us_states.json";

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

    submitBtn.innerHTML = "Submit";
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "btn btn-primary");

    myForm.appendChild(mainContainer);
    myForm.appendChild(submitBtn);

    /////////////////////////////

    const speOptions = document.getElementById("Specialty");
    console.log(speOptions);
    speOptions.addEventListener("change", () => {
      // let x = speOptions.value;
      const mainCont = document.getElementById("main-container");

      switch (speOptions.value) {
        case "Physician Assistant":
          mainCont.innerHTML = "";
          switch_specialty(data.pa);
          break;
        case "Nurse Practitioner":
          mainCont.innerHTML = "";
          switch_specialty(data.np);
          break;
        case "Emergency Medical Technician":
          mainCont.innerHTML = "";
          switch_specialty(data.emt);
          break;
        default:
          break;
      }
    });
    /////////////////////////

    function switch_specialty(jsonObj) {
      for (const key in jsonObj) {
        const container = document.createElement("div");
        const label = document.createElement("label");
        const mainCont = document.getElementById("main-container");

        //Set NCCPA dropDownStates !!!
        dropDownStates("states", "State License", key, container);
        dropDownStates("nccpa", "Nccpa", key, container);
        dropDownStates("compact", "Compact License", key, container);
        mainContainer.appendChild(container);

        label.className = "input-group-text bold";
        label.setAttribute("for", [key]);
        label.textContent = [key];
        container.className = "container main-box input-group input-group-sm";
        container.appendChild(label);

        //   }
        for (const k in jsonObj[key]) {
          const box = document.createElement("div");
          const input = document.createElement("input");
          const span = document.createElement("span");

          box.className = "inp-box input-group-text";
          input.setAttribute("name", [key]);
          input.setAttribute("value", jsonObj[key][k]);
          input.setAttribute("type", "radio");

          if ([key] == "Certificate") {
            input.removeAttribute("name");
            container.setAttribute("id", "certificate");
          }

          if ([key] == "Experience") {
            input.removeAttribute("name");
            container.setAttribute("id", "experience");
          }

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

    /////////////////////////////
  });

const form = document.getElementById("form");
const myPrompt = document.getElementById("prompt");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cert = document
    .getElementById("certificate")
    .getElementsByTagName("input");
  let certificationsTxt = "Certifications : ";

  for (const prop in cert) {
    if (cert[prop].checked == true) {
      certificationsTxt += ` ${cert[prop].value}, `;
    }
  }

  const exp = document
    .getElementById("experience")
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
  myPrompt.innerHTML = `${promp}  ${certificationsTxt} <br> ${experienceTxt}`;
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
          console.log(data.states);
          const option = document.createElement("option");

          option.value = [state];
          option.innerHTML = `${state}, ${data[states][state]}`;
          select.appendChild(option);
          container.appendChild(select);
        }
      });
  }
}

// function dropDownStates(file, str, prop, container) {
//   if ([prop] == str) {
//     fetch([file])
//       .then((res) => res.json())
//       .then((states) => {
//         const select = document.createElement("select");

//         select.id = [prop];
//         select.name = [prop];
//         select.className = "form-select";
//         for (const state in states) {
//           const option = document.createElement("option");

//           option.value = [state];
//           option.innerHTML = `${state}, ${states[state]}`;
//           select.appendChild(option);
//           container.appendChild(select);
//         }
//       });
//   }
// }
