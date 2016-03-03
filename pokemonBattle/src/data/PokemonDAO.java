package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Pokemon;
import entities.Scores;

@Transactional
public class PokemonDAO {
	
	@PersistenceContext
	private EntityManager em;
	
	public List<Scores> getScores() {
		return em.createQuery("SELECT s FROM Scores s").getResultList();
	}
	
	public void createScore(Scores score) {
		em.persist(score);
	}
	
	public void addPlayer(Pokemon pokemon) {
		em.persist(pokemon);
	}
	public List<Pokemon> getAllPlayers() {
		
		List<Pokemon> pokemon = em.createQuery("SELECT c FROM Course c").getResultList();
		return pokemon;
	}
	
	public Boolean createPlayer(Pokemon pokemon) {
		em.persist(pokemon);
		
		return true;
	}
}
