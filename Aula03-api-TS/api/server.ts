import express, {type Request, type Response} from 'express';
//import PrismaClient = require('@prisma/client');
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use( express.json() )

app.get( '/categoria' , async ( req: Request, res: Response ) => {
    const categorias = await prisma.categoria.findMany()
    res.json( categorias )
} );

app.get( '/produto' , async ( req: Request, res: Response ) => {
    const produtos = await prisma.produto.findMany({
        include : {
            categoria : true
        }
    })
    res.json( produtos )
} );

app.get( '/produto/:id' , async ( req: Request, res: Response ) => {
    const idProd = req.params.id;
    const produto = await prisma.produto.findUnique({
        where : { id : Number( idProd ) } ,
        include : { categoria : true }
    })
    if( !produto ) 
        return res.status( 404 ).json( { error : 'Produto não encontrado' } );
    res.json( produto )
} );


app.post( '/produto' , async ( req: Request, res: Response ) => {
    const { nome , preco, codCat} = req.body ;
    try{
        const produto = await prisma.produto.create({
            data : {
                nome, preco, codCat
            }
        });
        res.status( 201 ).json( produto ); 
    }catch( error ){
        res.status( 400 ).json( 
            { error : 'Erro ao cadastrar o Produto. Verifique se a categoria existe' } );
    }
} );

app.put( '/produto/:id' , async ( req: Request, res: Response ) => {
    const { idProd } = req.params
    const { nome , preco, codCat} = req.body ;
    try{
        const produto = await prisma.produto.update({
            where : { id : Number( idProd ) } ,
            data : {
                nome, preco, codCat
            }
        });
        res.json( produto ); 
    }catch( error ){
        res.status( 404 ).json( 
            { error : 'Produto não encontrado ou categoria inválida' } );
    }
} );

app.delete( '/produto/:id' , async ( req: Request, res: Response ) => {
    const { idProd } = req.params
    try{
        const produto = await prisma.produto.delete({
            where : { id : Number( idProd ) } 
        });
        res.status(204).send(); // 204 / No Content 
    }catch( error ){
        res.status( 404 ).json( 
            { error : 'Produto não encontrado!' } );
    }
} );
