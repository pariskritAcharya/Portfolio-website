function parseExpression(expression) {
    expression = expression.replace(/x/g, '(x)');
    expression = expression.replace(/\^/g, '**');
    return new Function('x', 'return ' + expression + ';');
}

function fm(a, b) {
    return (a + b) / 2.0;
}

function calculate() {
    let a = 0;
    let b = 0;
    let m = 0;
    let tempa = 0;
    let tempb = 0;
  
    let expression = document.getElementById("exp").value.toLowerCase();
    let error = parseFloat(document.getElementById("error").value);
    let iteration = Number(document.getElementById("itteration").value);
    
    // Check if the expression evaluates correctly
    if (isNaN(parseExpression(expression)(0))) {
        alert("Enter a valid expression.");
        return;
    }
    
    // Validate error and iteration values
    if (!error && !iteration) {
        alert("Enter valid error and iteration values.");
        return;
    }

    const f = parseExpression(expression);
    let i = 0;
    while (true) {
        i++;
        tempa = f(i);
        tempb = f(i + 1);
        if (tempa * tempb < 0) {
            if (tempb > tempa) {
                a = i;
                b = i + 1;
            } else {
                a = i + 1;
                b = i;
            }
            break;
        }
    }

    let answer = "<p id=\"answer\"> " 
    if (!iteration){
        answer += "In Error:"+ error 
        
    }
    else{
        answer += "In Itteration:"+iteration
    }


    if (!iteration) {
        iteration = Math.abs(Math.round(Math.log(error / Math.abs(b - a) / Math.log(2))));
    }

    let outputHTML = "Solution,<br>here,<br> f(x)=" + expression + "<br>";

    outputHTML += "<p>f(" + a + ")=" + f(a) + ",<br> f(" + b + ")=" + f(b) + ",<br> f(" + a + ").f(" + b + ")=" + f(a) * f(b) + "</p>";

    let table = "<tr><th>S.N.</th><th>a</th><th>b</th><th>m</th><th>f(m)</th></tr>";

    for (let j = 0; j < iteration; j++) {
        m = fm(a, b);
        table += "<tr><td id=\"sn\">" + (j + 1) + ".</td><td>" + a + "</td><td>" + b + "</td><td>" + m + "</td><td>" + f(m) + "</td></tr>";
        if (f(m) > 0) {
            b = m;
        } else {
            a = m;
        }
    }

    let finalAnswer = m;
    let ans_error = Math.abs(finalAnswer ** 2 - 2);
   
    answer=answer+ "<br>Answer is: " + finalAnswer + "<br>Error is: " + ans_error + "</p>";

    document.getElementById("output").innerHTML = outputHTML;
    document.getElementById("table").innerHTML = table;
    document.getElementById("answer").innerHTML = answer;
}


