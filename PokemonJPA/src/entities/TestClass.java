package entities;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;



public class TestClass {
	public static void main(String[] args) {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("PokemonJPA");
		EntityManager em = emf.createEntityManager();
//		TypedQuery<Course> tq = em.createNamedQuery("Course.findALL", Course.class);
//		List<Course> courses = tq.getResultList();
		Pokemon pokemon = new Pokemon("1", 100);
		em.getTransaction().begin();
		em.persist(pokemon);
		em.getTransaction().commit();
		System.out.println(pokemon);
		System.out.println("created");
	}
}
