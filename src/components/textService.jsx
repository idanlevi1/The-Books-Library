export const handleString = (str) =>{
    return removeNonEnglishLetters(upperCaseFirstLetter(str))
}

const upperCaseFirstLetter = (str) => {
    return str.replace(/\w\S*/g, (txt)=>{
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
}

const removeNonEnglishLetters = (str) => {
    str = str.replace(/[^a-z0-9]/gi, (l) => { 
        return l===' ' ? ' ' : ''
    })
    return str.trim()
}

export const validateBookDetails = (book) => {
    let flag=true
    let bookNameRes='',authorRes='',publishedDateRes=''
    let bookNameTest = handleString(book.bookName)
    if(bookNameTest===''){
        flag=false
        bookNameRes='Book Name Is Empty Or Contains Only Signs!'
    }
    let authorTest = book.author.trim()
    if(authorTest===''){
        flag=false 
        authorRes='Author Is Empty!'
    }
    if(!validDate(book.publishedDate)){
        flag=false 
        publishedDateRes='Date Format Must Be d/m/yyyy!'
    }
    return {
        valid:flag,
        bookNameRes:bookNameRes,
        authorRes:authorRes,
        publishedDateRes:publishedDateRes,
        fixBookName:bookNameTest
    }
}


export const checkNotExistNameBookService = (id,name,books)=>{
    let notExist = true
    if(books.length>0){
        const booksWithoutCurrent = books.filter( b => b.id !== id)
        booksWithoutCurrent.forEach( b => {b.bookName === name ? notExist = false :b.bookName=b.bookName })
    }
    return notExist
}

export const handleAuthors =(authorsArr) =>{
    return authorsArr.join()
}

export const makeUniqueId = (books) =>{
    let uniqueId
    while(1){
        uniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
        let unique = true
        if(books.length>0)
            books.forEach( b => {b.id === uniqueId ? unique = false : b.id=b.id})
        if(unique)
            break;
    }
    return uniqueId

}

export const fixFormatDate = (publishedDate) =>{
    let date = new Date(publishedDate)
    let day=date.getDate()
    let year=date.getFullYear()
    let month=date.getMonth()
    return (day+'/'+(month+1)+'/'+year)
}

const validDate = (date) =>{
    let bits = date.split('/');
    let d = new Date(bits[2], bits[1] - 1, bits[0])
    return d && (d.getMonth() + 1) == bits[1]
}