var cap = ()=> {
    var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                  '1','2','3','4','5','6','7','8','9','0']

    var a = alpha[Math.floor(Math.random()*62)];
    var b = alpha[Math.floor(Math.random()*62)];
    var c = alpha[Math.floor(Math.random()*62)];
    var d = alpha[Math.floor(Math.random()*62)];
    var e = alpha[Math.floor(Math.random()*62)];
    var f = alpha[Math.floor(Math.random()*62)];
    
    var sum = a + b + c + d + e + f;

    document.getElementById("capt").value = sum;
}