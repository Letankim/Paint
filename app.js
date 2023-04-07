let color = document.querySelector("#color"),
    text = document.querySelector("#text"),
    imgSrc = document.querySelector("#img"),
    imgHide = document.querySelector(".img_hide"),
    eraser = document.querySelector("#eraser"),
    upSize = document.querySelector("#up_size"),
    downSize = document.querySelector("#down_size"),
    size = document.querySelector("#size"),
    save = document.querySelector("#save"),
    reset = document.querySelector("#reset"),
    canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    btnImgFile = document.querySelector('.tools_item.img');

let positionFirst = {
    x: 0,
    y: 0,
};

let positionLast = {
    x: 0,
    y: 0,
};

let isDrawing = false;
let paintColor = "#000";
let sizePaint = 10;
size.innerHTML = sizePaint;
//  get first position to draw
canvas.addEventListener("mousedown", function (e) {
    positionFirst = {
        x: e.offsetX,
        y: e.offsetY,
    };
    isDrawing = true;
});
//  get last position to draw after change first by last position
canvas.addEventListener("mousemove", function (e) {
    if (isDrawing) {
        positionLast = {
        x: e.offsetX,
        y: e.offsetY,
        };
        drawCircle(positionLast.x, positionLast.y);
        drawLine(positionFirst, positionLast);
        positionFirst = Object.assign(positionFirst, positionLast);
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, sizePaint, 0, Math.PI * 2);
    ctx.fillStyle = paintColor;
    ctx.fill();
}

function drawLine(positionFirst, positionLast) {
    ctx.beginPath();
    ctx.moveTo(positionFirst.x, positionFirst.y);
    ctx.lineTo(positionLast.x, positionLast.y);
    ctx.strokeStyle = paintColor;
    ctx.lineWidth = sizePaint * 2;
    ctx.stroke();
}
//  change color 
canvas.addEventListener("mouseup", function (e) {
    isDrawing = false;
});

color.addEventListener("change", function (e) {
    paintColor = e.target.value;
    eraser.style.backgroundColor = "#f0f5f3";
    eraser.style.color = "#000";
});
//  increase size of canvas
upSize.addEventListener("click", function (e) {
    if (sizePaint < 44) {
        sizePaint += 2;
    }
    size.innerHTML = sizePaint;
});
//  decrease size of canvas
downSize.addEventListener("click", function (e) {
    if (sizePaint > 2) {
        sizePaint -= 2;
        size.innerHTML = sizePaint;
    } else {
        alert("Size paint must be greater than zero");
    }
});
//  clear on canvas
reset.addEventListener("click", function (e) {
    if (confirm("Are you sure to reset?")) {
        let w = canvas.offsetWidth;
        let h = canvas.offsetHeight;
        ctx.clearRect(0, 0, w, h);
    }
});
// click eraser check if it is eraser change not eraser and reverse 
let isDelete = true;
let isOldColor = "";
eraser.addEventListener("click", function (e) {
    if (isDelete) {
        isDelete = false;
        isOldColor = paintColor;
        paintColor = "#fff";
        eraser.style.backgroundColor = "#d8d792";
        eraser.style.color = "#fff";
    } else {
        paintColor = isOldColor;
        isDelete = true;
        eraser.style.backgroundColor = "#f0f5f3";
        eraser.style.color = "#000";
    }
});

//  insert text at position when user click in canvas
let textValue = "";
text.addEventListener("change", function (e) {
  textValue = e.target.value;
});
//  when user blur on canvas get offsetX and offsetY
text.addEventListener("blur", function (e) {
  if (textValue != "") {
    canvas.addEventListener("click", function (event) {
        ctx.font = "30px Arial";
        ctx.fillStyle = paintColor;
        ctx.fillText(textValue, event.offsetX, event.offsetY);
        textValue = "";
        text.value = "";
    });
  }
});
//  insert image at position when user click
btnImgFile.addEventListener("click", function() {
    img.click();
})
let isAddImg = true;
img.addEventListener("change", function () {
    isAddImg = true;
    let src = this.files[0];
    imgHide.src = URL.createObjectURL(src);
    canvas.addEventListener("click", function (event) {
        if (isAddImg) {
            ctx.drawImage(imgHide,event.offsetX - 150,event.offsetY - 100,300,200);
            isAddImg = false;
        }
    });
});
//  save img by random năm
save.addEventListener("click", () => {
    const imageURL = canvas.toDataURL("image/png");
    downloadImage(imageURL);
});
//  download image canvas
async function downloadImage(imageURL) {
    let number = "1234567890";
    let name = `example${number[Math.floor(Math.random() * 10)]}${
        number[Math.floor(Math.random() * 10)]
    }.png`;
    const link = document.createElement("a");
    link.href = imageURL;
    const nameSave = name;
    link.download = nameSave;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
