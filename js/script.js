const URL = 'http://localhost:3000/'
let post = [];
let comment = 1;
let getData = async (URL) => {
    const res = await fetch(URL)
    const data = await res.json()
    return data
}

const fillList = (post) => {
    let list = document.querySelector('.container')
    list.insertAdjacentHTML(`beforeend`, `
    <div class="post"></div>
        <div class="likes">
            <div class="like"></div>
            <span class="like_num">${post["likes"]}</span>
        </div>
        <div class="dislikes">
            <div class="dislike"></div>
            <span class="dislike_num">${post["dislikes"]}</span>
        </div>
    <div class="comments">
        ${post["comments"]}  
    </div>
    <div class="add"><span>Добавить комментарий</span></div>
    <div class="save"><span>Сохранить</span></div>
   `)
}

let get = async () => {
    for (let i = 1; i <= 1; i++) {
        post.push(await getData(`${URL}post${i}`))
        fillList(post[i - 1])
    }
    setTimeout(() => {
        document.querySelector('.likes').addEventListener('click', ()=>{
            document.querySelector('.like_num').innerHTML = Number(document.querySelector('.like_num').innerHTML) + 1 
        });
        document.querySelector('.dislikes').addEventListener('click', ()=>{
            document.querySelector('.dislike_num').innerHTML = Number(document.querySelector('.dislike_num').innerHTML) + 1 
        });
        document.querySelector('.add').addEventListener('click', ()=>{
            document.querySelector('.comments').insertAdjacentHTML(`beforeend`, `<div class="comment" id="comment${comment}"><span contenteditable="true">${prompt('Введите комментарий')}</span></div>`)
        })
        document.querySelector('.save').addEventListener('click', async () => {
            await patchData(`${URL}post1`, { "likes": document.querySelector('.like_num').innerHTML})
            await patchData(`${URL}post1`, { "dislikes": document.querySelector('.dislike_num').innerHTML})
            await patchData(`${URL}post1`, { "comments": document.querySelector('.comments').innerHTML})
        })        
    }, 50);
}; 

get();

let patchData = async (url, obj) => {
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    return res.json();
}
