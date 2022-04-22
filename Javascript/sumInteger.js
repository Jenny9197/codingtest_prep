function solution(n){
    var answer = 0;
    let stringNum = n.toString().split("");
    stringNum.forEach((el) => answer + +el)

    return answer;
}

