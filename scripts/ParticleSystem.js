function ParticleSystem(spec, context){
    var that = {},
        nextName = 1,
        lifetime = 2,
        currLifetime = 0;
        particles = {},
        imgSrc = spec.image;

        spec.image = new Image();
        spec.image.onload = function(){
            that.render = function(){
                var value,
                    particle;
                for(value in particles){
                    if(particles.hasOwnProperty(value)){
                        particle = particles[value];
                        
                        context.save();
		
                        context.translate(particle.center.x, particle.center.y);
                        context.rotate(particle.rotation);
                        context.translate(-particle.center.x, -particle.center.y);
                        
                        context.drawImage(
                            particle.image, 
                            particle.center.x - particle.size/2, 
                            particle.center.y - particle.size/2,
                            particle.size, particle.size);
                        
                        context.restore();
                    }
                }
            };
        };
        spec.image.src = imgSrc;

        that.create = function(){
            for(var i = 0; i < 20; i++){
                var p = {
                    image: spec.image,
                    size: Random.nextGaussian(10, 4),
                    center: {x: Random.nextGaussian(spec.center.x.mean,spec.center.x.stdev), y: Random.nextGaussian(spec.center.y.mean,spec.center.y.stdev)},
                    direction: {x: 0, y: 2},
                    speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
                    rotation: 0,
                    lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),	// How long the particle should live, in seconds
                    alive: 0	// How long the particle has been alive, in seconds
                };

                p.size = Math.max(1,p.size);

                p.lifetime = Math.max(0.01, p.lifetime);

                particles[nextName++] = p;
            }
        };
        that.update = function(elapsedTime){
            var removeMe = [],
                value,
                particle;
            
            elapsedTime = elapsedTime/1000;
            //currLifetime += elapsedTime;
            for(value in particles){
                if(particles.hasOwnProperty(value)){
                    particle = particles[value];

                    particle.alive += elapsedTime;

                    particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
				    particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

                    particle.rotation += particle.speed / 500;

                    if (particle.alive > particle.lifetime) {
					    removeMe.push(value);
				    }
                }
            }
            for (particle = 0; particle < removeMe.length; particle++) {
			    delete particles[removeMe[particle]];
		    }
		    removeMe.length = 0;
        };
        that.shouldDie = function(){
            if(Object.keys(particles).length == 0){
                return true;
            }else{
                return false;
            }
        }
        that.render = function() {
	    };
	
	    return that;
}