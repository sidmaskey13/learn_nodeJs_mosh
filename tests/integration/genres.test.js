const request = require('supertest')
const {Genre} = require('../../models/genre')
const {User} = require('../../models/user')
let server;

describe('/api/genres', () => { 
    beforeEach(() => { server = require('../../mongo'); })
    afterEach(async () => { 
    server.close(); 
    await Genre.deleteMany({}); 
  });
    
    describe('GET /', () => { 
        it('should return all the genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200)
            expect(res.body.genres.length).toBe(2)
            expect(res.body.genres.some(g=>g.name==='genre1')).toBeTruthy()
            expect(res.body.genres.some(g=>g.name==='genre2')).toBeTruthy()
        })
    
    })
    describe('GET /:id', () => {
        it('should return a genre of given id', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();
            const res = await request(server).get('/api/genres/' + genre._id)
            
            expect(res.status).toBe(200)
            expect(res.body.genre).toHaveProperty('name',genre.name)
            // expect(res.body.genres).toMatchObject(genre)
        })
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1')
            
            expect(res.status).toBe(404)
        })
    })

    describe('POST /', () => {
        
        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name })
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1'
        })

        it('should return 401 if user is not logged in', async () => {
            token = ''
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if genre invalid, less than 5 characters or more than 50 characters', async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should save genres if valid', async () => {
            const res = await exec();
            const genre = await Genre.find({name:'genre1'})
            expect(genre).not.toBeNull();
        });

        it('should return the genres if valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','genre1');
        
        });
    })
    
    
})