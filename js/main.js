/**
 * Created by kevin on 04/10/15.
 */
// Global Vars
var pixel, colorPixel;
var forma = 0;
var metodo = 0;
var li_metodo = document.getElementById("li_metodo");
var li_forma = document.getElementById("li_forma");
var methods = [
    ['Método Directo','ADD Simple','ADD Entero'], //Lineas
    ['Representación Implícita','Representación Parametrica Polar','Representación Incremental'], //Circulos
    ['Método Directo','ADD Simple','ADD Entero'], //Poligonos
    ['Algoritmo de Cohen - Sutherland','Algoritmo de Sutherland - Hodgman'], //Recortes
    ['Traslación','Rotación','Excalamiento','Afinamiento en Y','Afinamiento en X','Reflexion'] //Transformaciones
];
var fist_click;
function main()
{
    var canvas = document.getElementById("canvas2D");
    var coordenadas = document.getElementById("coordenadas");
    var dibujando = false;
    var pStart, pEnd,objetos = [],array_poligonos = [],str,pos,contador_poligonos=0;
    if (!canvas)
    {
        alert("No se encontro el elemento canvas.");
        return;
    }
    var context = canvas.getContext("2d");
    //Verificar si se esta dibujando un poligono
    var pi_poligono = 0;
    DibujarGrilla(context,10, 0.5);
    //pixel = context.createImageData(1,1);
    //colorPixel = pixel.data;
    CambiarMetodo(forma,metodo);
    canvas.addEventListener("mousedown", function (e)
    {
        if(forma == 4)//Transformaciones
        {
            var x, y,point,angulo;

            if(metodo == 0) //Translacion
            {
                x = parseInt(prompt("Trasladar x pixeles horizontales")) || 0;
                y = parseInt(prompt("Trasladar y pixeles horizontales")) || 0;
                //context.translate(x,-y);
                //console.log("hola");
                point = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                angulo = 20*Math.PI/180;
                console.log(angulo);
                console.log(point);
                objetos.forEach(function(element,index){
                    element[0].x += x;
                    element[0].y +=y;
                    element[1].x +=x;
                    element[1].y +=y;
                });
                for(var i = 0;i<array_poligonos.length;i++)
                {
                    array_poligonos[i].array_coordenadas.forEach(function(element,index){
                        element[0] = element[0] + x;
                        element[1] = element[1]- y;
                    });
                }
                //Dibujnar
                if(objetos  != [])
                {
                    DibujarObjetosAlmacenados(context,objetos);
                }
                if(contador_poligonos > 0 )
                {
                    array_poligonos.forEach(function(element)
                    {
                        element.dibujar();
                    });
                }
            }
            else if(metodo == 1)//Rotacion
            {
                point = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                //context.translate(context.canvas.width/2-point.x,-(context.canvas.height/2-point.y));
                angulo = 20*Math.PI/180;
                console.log("Angulo :",angulo);
                objetos.forEach(function(element,index){
                    xp = element[0].x;
                    yp = element[0].y;
                    console.log(xp,yp);
                    element[0].x = point.x + (xp-point.x)*Math.cos(angulo) - (yp-point.y)*Math.sin(angulo);
                    element[0].y = point.y + (xp-point.x)*Math.sin(angulo) + (yp-point.y)*Math.cos(angulo);
                    xp = element[1].x;
                    yp = element[1].y;
                    element[1].x = point.x + (xp-point.x)*Math.cos(angulo) - (yp-point.y)*Math.sin(angulo);
                    element[1].y = point.y + (xp-point.x)*Math.sin(angulo) + (yp-point.y)*Math.cos(angulo);
                });
                for(var i = 0;i<array_poligonos.length;i++)
                {
                    array_poligonos[i].array_coordenadas.forEach(function(element,index) {
                        xp = element[0] - context.canvas.width/2;
                        yp = (element[1] - context.canvas.height/2)*-1;

                        element[0] = point.x + (xp-point.x)*Math.cos(angulo) - (yp-point.y)*Math.sin(angulo)  + context.canvas.width/2;
                        element[1] = (point.y + (xp-point.x)*Math.sin(angulo) + (yp-point.y)*Math.cos(angulo)  - context.canvas.height/2)*-1;
                    });
                }
                //Dibujnar
                if(objetos  != [])
                {
                    DibujarObjetosAlmacenados(context,objetos);
                }
                if(contador_poligonos > 0 )
                {
                    array_poligonos.forEach(function(element)
                    {
                        element.dibujar();
                    });
                }
            }
            else if(metodo == 2 )//Escalamiento
            {
                var Ex = prompt("Factor de escalamiento en x:");
                var Ey = prompt("Factor de escalamiento en y: ");
                point = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                objetos.forEach(function(element){
                    xp = element[0].x;
                    yp = element[0].y;
                    console.log(xp,yp);
                    element[0].x = point.x + (xp-point.x)*Ex;
                    element[0].y = point.y + (yp -point.y)*Ey;
                    xp = element[1].x;
                    yp = element[1].y;
                    element[1].x = point.x + (xp-point.x)*Ex;
                    element[1].y = point.y + (yp -point.y)*Ey;
                });
                for(var i = 0;i<array_poligonos.length;i++)
                {
                    array_poligonos[i].array_coordenadas.forEach(function(element,index) {
                        xp = element[0] - context.canvas.width/2;
                        yp = (element[1] - context.canvas.height/2)*-1;

                        element[0] = point.x + (xp-point.x)*Ex  + context.canvas.width/2;
                        element[1] = (point.y + (yp -point.y)*Ey  - context.canvas.height/2)*-1;
                    });
                }
                //Dibujnar
                if(objetos  != [])
                {
                    DibujarObjetosAlmacenados(context,objetos);
                }
                if(contador_poligonos > 0 )
                {
                    array_poligonos.forEach(function(element)
                    {
                        element.dibujar();
                    });
                }
            }
            else if(metodo == 3 )//Afinamiento en Y
            {
                var afy = prompt("Factor de escalamiento en Y:");
                point = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                objetos.forEach(function(element){
                    xp = element[0].x;
                    yp = element[0].y;
                    element[0].y = yp + xp*afy;
                    xp = element[1].x;
                    yp = element[1].y;
                    element[1].y = yp + xp*afy;
                });
                for(var i = 0;i<array_poligonos.length;i++)
                {
                    array_poligonos[i].array_coordenadas.forEach(function(element,index) {
                        xp = element[0] - context.canvas.width/2;
                        yp = (element[1] - context.canvas.height/2)*-1;
                        element[1] = (yp + xp*afy - context.canvas.height/2)*-1;
                    });
                }
                //Dibujnar
                if(objetos  != [])
                {
                    DibujarObjetosAlmacenados(context,objetos);
                }
                if(contador_poligonos > 0 )
                {
                    array_poligonos.forEach(function(element)
                    {
                        element.dibujar();
                    });
                }
            }
            else if(metodo == 4)//Afilamiento en X
            {
                var afx = prompt("Factor de escalamiento en X:");
                point = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                objetos.forEach(function(element){
                    xp = element[0].x;
                    yp = element[0].y;
                    element[0].x = xp + yp*afx;
                    xp = element[1].x;
                    yp = element[1].y;
                    element[1].x = xp + yp*afx;
                });
                for(var i = 0;i<array_poligonos.length;i++)
                {
                    array_poligonos[i].array_coordenadas.forEach(function(element,index) {
                        xp = element[0] - context.canvas.width/2;
                        yp = (element[1] - context.canvas.height/2)*-1;
                        element[0] = xp + yp*afx + context.canvas.width/2;
                    });
                }
                //Dibujar
                if(objetos  != [])
                {
                    DibujarObjetosAlmacenados(context,objetos);
                }
                if(contador_poligonos > 0 )
                {
                    array_poligonos.forEach(function(element)
                    {
                        element.dibujar();
                    });
                }
            }
            else if(metodo == 5)//Reflexion
            {
                console.log("refelxion..");
                point = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                //context.translate(context.canvas.width/2-point.x,-(context.canvas.height/2-point.y));
                angulo = Math.PI;
                console.log("Angulo :",angulo);
                objetos.forEach(function(element,index){
                    xp = element[0].x;
                    yp = element[0].y;
                    console.log(xp,yp);
                    element[0].x = point.x + (xp-point.x)*Math.cos(angulo) - (yp-point.y)*Math.sin(angulo);
                    element[0].y = point.y + (xp-point.x)*Math.sin(angulo) + (yp-point.y)*Math.cos(angulo);
                    xp = element[1].x;
                    yp = element[1].y;
                    element[1].x = point.x + (xp-point.x)*Math.cos(angulo) - (yp-point.y)*Math.sin(angulo);
                    element[1].y = point.y + (xp-point.x)*Math.sin(angulo) + (yp-point.y)*Math.cos(angulo);
                });
                for(var i = 0;i<array_poligonos.length;i++)
                {
                    array_poligonos[i].array_coordenadas.forEach(function(element,index) {
                        xp = element[0] - context.canvas.width/2;
                        yp = (element[1] - context.canvas.height/2)*-1;

                        element[0] = point.x + (xp-point.x)*Math.cos(angulo) - (yp-point.y)*Math.sin(angulo)  + context.canvas.width/2;
                        element[1] = (point.y + (xp-point.x)*Math.sin(angulo) + (yp-point.y)*Math.cos(angulo)  - context.canvas.height/2)*-1;
                    });
                }
                //Dibujnar
                if(objetos  != [])
                {
                    DibujarObjetosAlmacenados(context,objetos);
                }
                if(contador_poligonos > 0 )
                {
                    array_poligonos.forEach(function(element)
                    {
                        element.dibujar();
                    });
                }
            }
        }
        dibujando = true;
        if(forma == 3)//Recorte
        {
            dibujando = false;
            if(fist_click)
            {
                pStart = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
            }
            else
            {
                pEnd = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                context.beginPath();
                context.strokeStyle = '#00FF48';
                context.strokeRect(pStart.x + canvas.width/2, (pStart.y - context.canvas.height/2)*-1, pEnd.x-pStart.x, (pEnd.y-pStart.y)*-1); //cotorno del rectángulo anterior
                context.stroke();

                if(pStart.x > pEnd.x){
                    var xder = pStart.x;
                    var xizq = pEnd.x;
                }
                else{
                    var xder = pEnd.x;
                    var xizq = pStart.x;
                }
                if(pStart.y > pEnd.y)
                {
                    var ysup = pStart.y;
                    var yinf = pEnd.y;
                }
                else
                {
                    var ysup = pEnd.y;
                    var yinf = pStart.y;
                }
                switch(metodo)
                {
                    case 0: Cohen_Sutherland(context,{'xizq':xizq,'ysup':ysup,'xder':xder,'yinf':yinf},objetos); break;
                    case 1: Sutherland_Hodgman(context,{'xizq':xizq,'ysup':ysup,'xder':xder,'yinf':yinf},array_poligonos); break;
                }

            }
        }
        else if(forma == 2) //Poligono
        {
            if( pi_poligono == 0) //Primer punto del poligono
            {
                pStart = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
                pi_poligono = pStart;
                pEnd = pStart;
                array_poligonos[contador_poligonos] = new Poligono(context);
            }
            else
            {
                array_poligonos[contador_poligonos].add_coordenada([pStart.x+context.canvas.width/2,-1*(pStart.y-context.canvas.height/2)]); //llenar el array de poligonos
                objetos.push([pStart,pEnd,0,metodo]); // array de lineas
                pStart = pEnd;
            }
        }
        else//Linea o Circulo
        {
            pStart = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
            pEnd = pStart;
        }

    });

    canvas.addEventListener("mouseup", function (e) {
        if (forma == 2)//poligono
        {
            if (pi_poligono == pEnd) {
                dibujando = false;
                pi_poligono = 0;
                array_poligonos[contador_poligonos].terminado = true;
                for(var i = 0;i< array_poligonos[contador_poligonos].numero_puntos();i++)
                {
                    objetos.pop();
                }
                contador_poligonos = contador_poligonos + 1;
            }
        }
        else if(forma == 3)//recorte
        {
            fist_click = false;
        }
        else if(forma == 0 || forma ==1)//Linea o circulo
        {
            dibujando = false;
            objetos.push([pStart,pEnd,forma,metodo]);
            console.log(objetos);
        }
    });

    canvas.addEventListener("mousemove", function (e)
    {
        if (dibujando)
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
            DibujarGrilla(context, 10, 0.5);
            if(objetos  != [])
            {
                DibujarObjetosAlmacenados(context,objetos);
            }
            if(contador_poligonos > 0 )
            {
                array_poligonos.forEach(function(element)
                {
                    element.dibujar();
                });
            }
            pEnd = ObtenerPosicionMouse(canvas, e.clientX, e.clientY);
            if(forma==2) //Cerrar un poligono
            {

                if((pEnd.x <=(pi_poligono.x + 20) && pEnd.x >= (pi_poligono.x - 20))&&(pEnd.y <=(pi_poligono.y + 20) && pEnd.y >= (pi_poligono.y - 20)))
                {
                    pEnd = pi_poligono;
                }
            }
            switch(forma)
            {
                case 0 : Linea(context, pStart.x, pStart.y, pEnd.x, pEnd.y, 0, 128, 255, 1,metodo); break;
                case 1 : Circulo(context, pStart.x, pStart.y, pEnd.x, pEnd.y, 0, 128, 255, 1,metodo); break;
                case 2 : Linea(context, pStart.x, pStart.y, pEnd.x, pEnd.y, 0, 128, 255, 1,metodo); break;
            }

        }
        //dibujar posiciones en el canvas
        pos = ObtenerPosicionMouse(canvas, parseInt(e.clientX), parseInt(e.clientY));
        str = "(" + pos.x + "," + pos.y + ") m = "+ pos.y/pos.x ;
        coordenadas.textContent = str;
    });
}