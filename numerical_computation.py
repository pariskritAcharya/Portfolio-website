import math

#function f(x)
def f(x:float):
    return x**2-2  
#equation to solve to find root like square root and cube root

#m = (a+b)/2
def fm(a,b):
    return (a+b)/2.0


#finding upper limit and lower limit
a=0
b=0

tempa=0
tempb=0

for i in range(50):
    tempa=f(i)
    tempb=f(i+1)
    if tempa*tempb <0:
        if tempb>tempa:
            a=i
            b=i+1
        else:
            a=i+1
            b=i
        break
            



#itteration count
#error = float(input("enter error: "))
itteration=20

#if error!=0.0:
    #itteration = abs(round(math.log(error/abs(b-a)/math.log(2))))
    

#the whole algorithm
print("\n\nf(",a,")=",f(a),"\tf(",b,")=",f(b),"\tf(",a,").f(",b,")=",f(a)*f(b),"\n")
print("\ta \t b \t m \t f(m):\n")


    
for i in range(itteration):
    m=fm(a,b)
    print(i+1,".\t",a,"   ",b,"   ",m,"   ",f(m),"\n")
    if f(m) > 0:
        b=m
    else:
        a=m

ans_error=abs(m**2-2 )
print("answer is: ",m,"\n error is: ",ans_error)

    