
         function showPreview(event){
            const fileInput = event.target;
            const file = fileInput.files[0];
            const header = document.querySelector(".header");
            const uploadIcon = document.getElementById("upload-icon");
            const uploadText = document.getElementById("upload-text");
            const footer = document.querySelector(".footer");

            if(file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    header.style.backgroundImage = 
                    `url(${e.target.result})`;
                    header.style.border = 'none';
                    uploadIcon.style.display = 'none';
                    uploadText.style.display = 'none';
                    footer.innerHTML = `<p>${file.name}</p>`
                }
                reader.readAsDataURL(file);
            }

        }