/**
 * Created by kevin on 04/10/15.
 */

/// @param context the context of the canvas
/// @param xi, yi initial point of the line
/// @param xf, yf final point of the line
/// @param r, g, b color in RGB color space in range [0,255]
/// @param a must be in range 0 - 1, where 1 is fully opaque
function Poligono(context){
    this.array_coordenadas = [];
    this.terminado = false;
    this.coordenadas = function(){
        return  this.array_coordenadas;
    };
    this.add_coordenada = function(puntos){
        this.array_coordenadas.push(puntos)
    };
    this.numero_puntos = function(){
        return this.array_coordenadas.length;
    };
    this.dibujar = function(){
        if(this.terminado)
        {
            context.strokeStyle = '#888';
            context.fillStyle = '#8f8';
            context.beginPath();
            context.moveTo(this.array_coordenadas[0][0],this.array_coordenadas[0][1]); //first vertex
            for (var i = 1; i < this.array_coordenadas.length ; i++)
                context.lineTo(this.array_coordenadas[i][0],this.array_coordenadas[i][1]);
            context.lineTo(this.array_coordenadas[0][0],this.array_coordenadas[0][1]); //back to start
            context.fill();
            context.stroke();
            context.closePath();
        }
        else
        {
            console.log("Esta poligono no se puede dibujar por que no tiene todas sus coordenadas completas.")
        }
    };
}


function Linea(context, xi, yi, xf, yf, r, g, b, a,opcion)
{
    var aux = 0, aux1 = 0, x,y;
    if (xi == xf) //Linea Vertical
    {
        if (yi > yf)
        {
            aux = yf;
            yf = yi;
            yi = aux;

        }
        x=xi;
        for(y=yi;y<=yf;y++)
        {
            setPixel(context,x,y,r,g,b,a);
        }
    }
    if (yi == yf) //Linea Horizontal
    {
        if (xi > xf)
        {
            aux = xf;
            xf = xi;
            xi = aux;
        }
        y = yi;
        for(x=xi;x<=xf;x++)
        {
            setPixel(context,x,y,r,g,b,a);
        }
    }
    if ((xi > xf && yi > yf) || (xi < xf && yi > yf))
    {
        aux = xi;
        xi = xf;
        xf = aux;

        aux1 = yi;
        yi = yf;
        yf = aux1;
    }
    var Dx = xf - xi;
    var Dy = yf - yi;
    var m = Dy / Dx;
    switch(opcion)
    {
        case 0: //Método Directo
            if(Dx > Dy)
            {
                pasos = Dx;
            }
            else
            {
                pasos = Dy;
            }
            xinc = Dx / pasos;
            yinc = Dy / pasos;
            x = parseInt(xi);
            y = parseInt(yi);
            setPixel(context,x,y,r,g,b,a);
            for(k=1; k<=pasos;k++)
            {
                x = x + xinc;
                y = y + yinc;
                setPixel(context,parseInt(x),parseInt(y),r,g,b,a);
            }
            break;
        case 1: //Add Simple
            var c,i;
            setPixel(context,xi ,yi, r,g,b,a);
            if (Math.abs(m) < 1)
            {
                console.log("m < 1");
                c = yi - (m * xi);
                x = xi;
                i = 1;
                while ((x + i) <= xf)
                {
                    y1 = m * (x + i) + c;
                    y = Math.round(y1);
                    setPixel(context, x + i , y,r,g,b,a);
                    i = i + 1;

                }
            }
            else if(Math.abs(m) > 1)
            {
                console.log("m>1");

                x1 = xi+1;
                y = yi;
                i = 1;

                while ((y + i) <= yf)
                {
                    x1 = 1/m + x1;
                    x = Math.round(x1);
                    setPixel(context, x , (y + i), r,g,b,a);
                    i = i + 1;

                }
            }
            break;
        case 2: //Add Entero
            var h;
            if (Dx == Dy) //m=1;
            {
                h = 0;
                for (var j = xi; j < xf; j++)
                {
                    setPixel(context, j , (yi + h), r,g,b,a);
                    h = h + 1;
                }
            }
            if (Dx == -Dy) //m=-1
            {
                h = 0;
                for (j = xi; j < xf; j++)
                {
                    setPixel(context,j , (yi - h), r,g,b,a);
                    h = h + 1;
                }
            }
            error = 0;
            setPixel(context,xi , yi, r,g,b,a);
            xant = xi;
            yant = yi;
            //caso 1:
            if (0 < m && m < 1 && (Dx > 0 && Dy > 0))
            {
                while (xant != xf && yant != yf)
                {
                    if (error < 0)
                    {
                        xsig = xant + 1;
                        ysig = yant;
                        error = error + Dy;
                    }
                    else
                    {
                        xsig = xant + 1;
                        ysig = yant + 1;
                        error = error + (Dy - Dx);
                    }
                    setPixel(context, xsig , ysig,r,g,b,a);
                    xant = xsig;
                    yant = ysig;
                }
            }
            else if (m > 1 && (Dx >= 0 && Dy >= 0)) //2do caso
            {
                while (xant != xf && yant != yf)
                {
                    if (error < 0)
                    {
                        xsig = xant + 1;
                        ysig = yant + 1;
                        error = error + (Dy - Dx);
                    }
                    else
                    {
                        xsig = xant;
                        ysig = yant + 1;
                        error = error - Dx;
                    }
                    setPixel(context,xsig , ysig, r,g,b,a);
                    xant = xsig;
                    yant = ysig;
                }

            }
            else if (-1 < m && m < 0 && (Dx < 0 && Dy >= 0)) //3er caso
            {
                while (xant != xf && yant != yf)
                {
                    if (error < 0)
                    {
                        xsig = xant - 1;
                        ysig = yant;
                        error = error + Dy;
                    }
                    else
                    {
                        xsig = xant - 1;
                        ysig = yant + 1;
                        error = error + (Dx + Dy);
                    }
                    setPixel(context,xsig , ysig, r,g,b,a);
                    xant = xsig;
                    yant = ysig;
                }
            }
            else if (m < -1 && (Dx < 0 && Dy >= 0))
            {
                while (xant != xf && yant != yf)
                {
                    if (error < 0)
                    {
                        xsig = xant - 1;
                        ysig = yant + 1;
                        error = error + (Dx + Dy);
                    }
                    else
                    {
                        xsig = xant;
                        ysig = yant + 1;
                        error = error + Dx;
                    }
                    setPixel(context,xsig,ysig,r,g,b,a);
                    xant = xsig;
                    yant = ysig;
                }
            }
            break;
    }

}
function Circulo(context, xi, yi, xf, yf, r, g, b, a,opcion)
{
    xDist = xf - xi;
    yDist = yf - yi;
    rd = parseInt( Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)) );
    switch(opcion)
    {
        case 0: // Representación Implicita
            aa = xi - rd;
            n = xi + rd;
            for (i = aa; i < n; i++)
            {
                yy = yi + Math.sqrt(rd * rd - Math.pow(i - xi, 2));
                yy1 = yi - Math.sqrt(rd * rd - Math.pow(i - xi, 2));
                setPixel(context, i, yy, r,g,b,a);
                setPixel(context, i, yy1, r,g,b,a);
            }
            break;
        case 1: // Parametrica Polar
            radian = 2 * Math.PI / 360;
            alfa = 0;
            x = rd;
            y = 0;
            while (alfa <= 2 * Math.PI)
            {

                setPixel(context, x + xi,  y + yi, r,g,b,a);
                alfa = alfa + radian;
                dx = rd * Math.cos(alfa);
                x = parseInt(dx);
                dy = rd * Math.sin(alfa);
                y = parseInt(dy);

            }
            break;
        case 2:
            radian = 2 * Math.PI / 360;
            alfa = 0;
            x = rd;
            y = 0;
            while (alfa <= 2 * Math.PI)
            {

                setPixel(context, x + xi,  y + yi, r,g,b,a);
                alfa = alfa + radian;
                dx = rd * Math.cos(alfa);
                x = parseInt(dx);
                dy = rd * Math.sin(alfa);
                y = parseInt(dy);

            }
            break;
    }
}

//Recorte de Linea
/*
function CohenSutherlandClipping()
{
    var Vector2, _clipMin, _clipMax;

    public IEnumerable<Vector2> GetBoundingPolygon() {
        yield return _clipMin;
        yield return new Vector2(_clipMax.X, _clipMin.Y);
        yield return _clipMax;
        yield return new Vector2(_clipMin.X, _clipMax.Y);
    }

    public void SetBoundingRectangle(Vector2 start, Vector2 end) {
        _clipMin = start;
        _clipMax = end;
    }

    public void SetBoundingPolygon(IEnumerable<Vector2> points) {
        throw new NotSupportedException("see Capabilities =)");
    }

    private int getPointCode(Vector2 point) {
        int result = 0;

        if (point.X < _clipMin.X) ++result;
        else if (point.X > _clipMax.X) result |= 2;

        if (point.Y > _clipMax.Y) result |= 4;
        else if (point.Y < _clipMin.Y) result |= 8;

        return result;
    }

    public bool ClipLine(ref Line line) {
        Vector2 P = line.End - line.Start;
        int startCode = getPointCode(line.Start);
        int endCode = getPointCode(line.End);
        float dxdy = 0, dydx = 0;

        if (P.X != 0) dydx = P.Y / P.X;
        if (P.Y != 0) dxdy = P.X / P.Y;

        for (int stage = 0; stage < 4; stage++) {
            if ((startCode | endCode) == 0) return true;
            else if ((startCode & endCode) != 0) return false;

            if (startCode == 0) {
                int buf1 = startCode; startCode = endCode; endCode = buf1;
                Vector2 buf2 = line.Start; line.Start = line.End; line.End = buf2;
            }

            if ((startCode & 1) == 1) {
                line.Start.Y += dydx * (_clipMin.X - line.Start.X);
                line.Start.X = _clipMin.X;
            }
            else if ((startCode & 2) == 2) {
                line.Start.Y += dydx * (_clipMax.X - line.Start.X);
                line.Start.X = _clipMax.X;
            }
            else if ((startCode & 4) == 4) {
                line.Start.X += dxdy * (_clipMax.Y - line.Start.Y);
                line.Start.Y = _clipMax.Y;
            }
            else if ((startCode & 8) == 8) {
                line.Start.X += dxdy * (_clipMin.Y - line.Start.Y);
                line.Start.Y = _clipMin.Y;
            }

            startCode = getPointCode(line.Start);
        }

        return true;
    }

    public ClippingCapabilities Capabilities {
        get {
            return ClippingCapabilities.RectangleWindow;
        }
    }


}

function Clipping(x0, y0, x1, y1, xmin, ymin, xmax, ymax) {
    // compute vertex codes
    C0 = computeCode(x0, y0, xmin, ymin, xmax, ymax);
    C1 = computeCode(x1, y1, xmin, ymin, xmax, ymax);
    do {
        // Trivial accept: inside
        if((C0 | C1) == 0) {
            accept = TRUE; done = TRUE;
        } else // Trivial reject: outside
        if((C0 & C1) != 0) {
            done = TRUE;
        }
        else { //other case
            // Take one vertex
            if(C0) {C = C0;} else {C = C1;}
            //find intersection with top line of clipping area
            if(C && TOP) {
                y = ymax; //y must be Ymax on intersection point
                x = ...  //compute the X using the line equation
            }
            //repeat for bottom, left and right
            //...
        }
        if(C == C0) { //assing position and recompute code
            x0 = x; y0 = y;
            C0 = ComputeCode(x0, y0, xmin,ymin,xmax,ymax);
        } else{
            x1 = x; y1 = y;
            C1 = ComputeCode(x1, y1, xmin,ymin,xmax,ymax);
        }
    } while (done == FALSE);
}
    */

function Cohen_Sutherland(context,rect,objetos)
{
    var lineas = [];
    for(var i = 0; i< objetos.length;i++)
    {
        lineas.push(objetos[i])
    }
   lineas.forEach(function(element,index){
       cohen_sutherland(context,element[0],element[1],rect)
    });
    window.fist_click = true;
}

var TOP = 0x1, BOTTOM = 0x2, RIGHT = 0x4, LEFT = 0x8;
function ObtenerCodigo(p,rect)
{
    var oc = 0;
    if (p.y > rect.ysup)
        oc |= TOP;
    else if (p.y < rect.yinf)
        oc |= BOTTOM;
    if (p.x > rect.xder)
        oc |= RIGHT;
    else if (p.x < rect.xizq)
        oc |= LEFT;
    return oc;
}

function cohen_sutherland(context,pi,pf,rect)
{
    var accept,done,outcode1, outcode2;

    accept = false;
    done = false;

    outcode1 = ObtenerCodigo(pi,rect);
    outcode2 = ObtenerCodigo(pf,rect);
    do
    {
        if (outcode1 == 0 && outcode2 == 0)
        {
            accept = true;
            done = true;
        }
        else if (outcode1 & outcode2)
        {
            done = true;
        }
        else
        {
            var x, y;
            var outcode_ex = outcode1 ? outcode1 : outcode2;
            if (outcode_ex & TOP)
            {
                x = pi.x + (pf.x - pi.x) * (rect.ysup - pi.y) / (pf.y - pi.y);
                y = rect.ysup;
            }

            else if (outcode_ex & BOTTOM)
            {
                x = pi.x + (pf.x - pi.x) * (rect.yinf - pi.y) / (pf.y - pi.y);
                y = rect.yinf;
            }
            else if (outcode_ex & RIGHT)
            {
                y = pi.y + (pf.y - pi.y) * (rect.xder - pi.x) / (pf.x - pi.x);
                x = rect.xder;
            }
            else
            {
                y = pi.y + (pf.y - pi.y) * (rect.xizq - pi.x) / (pf.x - pi.x);
                x = rect.xizq;
            }
            if (outcode_ex == outcode1)
            {
                pi.x = x;
                pi.y = y;
                outcode1 = ObtenerCodigo(pi,rect);
            }
            else
            {
                pf.x = x;
                pf.y = y;
                outcode2 = ObtenerCodigo(pf,rect);
            }
        }
    } while (done == false);

    if (accept == true)
    {
        context.beginPath();
        context.strokeStyle = '#CC4A14';
        context.moveTo(pi.x+ context.canvas.width/2,(pi.y- context.canvas.height/2)*-1);
        context.lineTo(pf.x+ context.canvas.width/2,(pf.y- context.canvas.height/2)*-1);
        context.stroke();
    }
    else
    {
        pi.x = 0;pi.y = 0; pf.x = 0; pf.y = 0;
    }
}

/*
function Recorte(context,pi,pf,rect)
{

    var terminar = false, aceptar = false,codigo,delta_y,x,y;
    var cod_pi = CalcularCodigo(pi,rect);
    var cod_pf = CalcularCodigo(pf,rect);
    console.log(pi,cod_pi,pf,cod_pf);
    do {
        if ((cod_pi | cod_pf) == 0)//Dentro del rectangulo
        {
            aceptar = true;
            terminar = true;
        } else if ((cod_pi & cod_pf) != 0)//Fuera del rectangulo
        {
            terminar = true;
        }
        else//Oro caso
        {
            if (cod_pi == 0) {
                codigo = cod_pf;
            }
            else {
                codigo = cod_pi;
            }
            if (codigo == 8)//SUPERIOR
            {
                delta_y = pf.y - pi.y;
                if (delta_y == 0)//segmento vertical
                {
                    x = pi.x;
                }
                else {
                    x = pi.x + (pf.x - pi.x) * (rect.ysup - pi.y) / delta_y;
                }
                y = rect.ysup; //
            }
            else if (codigo == 4)//INFERIOR
            {
                delta_y = pf.y - pi.y;
                if (delta_y == 0)//segmento vertical
                {
                    x = pi.x;
                }
                else {
                    x = pi.x + (pf.x - pi.x) * (rect.yinf - pi.y) / delta_y;
                }
                y = rect.yinf;//
            }
            else if (codigo == 2)//DERECHA
            {
                x = rect.xder;//
                y = pi.y + (pf.y - pi.y) * (rect.xder - pi.x) / (pf.x - pi.x);
            }
            else if (codigo == 1)//IZQUIERDA
            {
                x = rect.xizq;//
                y = pi.y + (pf.y - pi.y) * (rect.xizq - pi.x) / (pf.x - pi.x);
            }
            if (codigo == cod_pi) {
                pi.x = x;
                pi.y = y;
                cod_pi = CalcularCodigo(pi, rect);
            }
            else {
                pf.x = x;
                pf.y = y;
                cod_pf = CalcularCodigo(pf, rect);
            }
        }
    } while (terminar = false);
   // if(aceptar)
    //{
        context.beginPath();
        context.moveTo(pi.x+ context.canvas.width/2,(pi.y- context.canvas.height/2)*-1);
        context.lineTo(pf.x+ context.canvas.width/2,(pf.y- context.canvas.height/2)*-1);
        context.stroke();
    //}

}
function CalcularCodigo(P,R)
{
    var codigo = 0;
    if(P.y > R.ysup)
    {
        codigo = codigo | 8;
    }
    if(P.y < R.yinf)
    {
        codigo= codigo | 4;
    }
    if(P.x > R.xder)
    {
        codigo = codigo | 2;
    }
    if(P.x < R.xizq)
    {
        codigo = codigo | 1;
    }
    return codigo;
}
    */

function drawPolygon(context, polygon, strokeStyle, fillStyle) {
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.beginPath();
    context.moveTo(polygon[0][0],polygon[0][1]); //first vertex
    for (var i = 1; i < polygon.length ; i++)
        context.lineTo(polygon[i][0],polygon[i][1]);
    context.lineTo(polygon[0][0],polygon[0][1]); //back to start
    context.fill();
    context.stroke();
    context.closePath();
}

function Sutherland_Hodgman(context,rect,poligonos)
{
    var viewport = [
        [rect.xizq + context.canvas.width/2,-1*(rect.yinf - context.canvas.height/2)],
        [rect.xizq + context.canvas.width/2,-1*(rect.ysup - context.canvas.height/2)],
        [rect.xder + context.canvas.width/2,-1*(rect.ysup - context.canvas.height/2)],
        [rect.xder + context.canvas.width/2,-1*(rect.yinf - context.canvas.height/2)] ];
    var clip;
    for(var i = 0; i<poligonos.length; i++)
    {
        clip = cortar_poligono(poligonos[i].coordenadas(),viewport);
        poligonos[i].array_coordenadas = clip;
        drawPolygon(context,clip,'#888','#CC4A14');
    }
}
function cortar_poligono(subjectPolygon, clipPolygon) {

    var cp1, cp2, s, e;
    var inside = function (p) {
        console.log(p);
        return (cp2[0]-cp1[0])*(p[1]-cp1[1]) > (cp2[1]-cp1[1])*(p[0]-cp1[0]);
    };
    var intersection = function () {
        var dc = [ cp1[0] - cp2[0], cp1[1] - cp2[1] ],
            dp = [ s[0] - e[0], s[1] - e[1] ],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
        return [(n1*dp[0] - n2*dc[0]) * n3, (n1*dp[1] - n2*dc[1]) * n3];
    };
    var outputList = subjectPolygon;
    cp1 = clipPolygon[clipPolygon.length-1];
    for (j in clipPolygon) {
        var cp2 = clipPolygon[j];
        var inputList = outputList;
        outputList = [];
        s = inputList[inputList.length - 1];
        for (i in inputList) {
            var e = inputList[i];
            if (inside(e)) {
                if (!inside(s)) {
                    outputList.push(intersection());
                }
                outputList.push(e);
            }
            else if (inside(s)) {
                outputList.push(intersection());
            }
            s = e;
        }
        cp1 = cp2;
    }
    return outputList
}

