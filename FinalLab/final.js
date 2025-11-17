let comments = [];
let selectedRating = 0;

document.querySelectorAll("#stars span").forEach(star=>{
    star.onclick = function(){
        selectedRating = this.dataset.val;
        updateStars();
    }
});

function updateStars(){
    document.querySelectorAll("#stars span").forEach(star=>{
        star.textContent = (star.dataset.val <= selectedRating) ? "★" : "☆";
    });
}

document.getElementById("commentForm").addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let comment = document.getElementById("comment").value.trim();

    if(name.length < 2){ alert("Name must be >=2 chars"); return; }
    if(comment.length < 10){ alert("Comment >=10 chars"); return; }
    if(email && !email.includes("@")){ alert("Invalid email"); return; }

    comments.push({name,email,comment,rating:Number(selectedRating)});
    render();
});

function render(){
    let list = document.getElementById("commentList");
    list.innerHTML = "";
    let total = comments.length;
    let avg = (comments.reduce((a,b)=>a+b.rating,0) / (total||1)).toFixed(1);

    document.getElementById("totalComments").textContent = total;
    document.getElementById("avgRating").textContent = avg;

    comments.forEach(c=>{
        let div = document.createElement("div");
        div.className="comment-box";
        div.innerHTML = `<strong>${c.name}</strong> (${c.email})<br>
                         Rating: ${"★".repeat(c.rating)}<br>
                         ${c.comment}`;
        list.appendChild(div);
    });
}
