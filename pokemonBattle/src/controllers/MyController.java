package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import data.PokemonDAO;
import entities.Scores;

@Controller
public class MyController {

	@Autowired
	private PokemonDAO pokemonDAO;
	
	@ResponseBody
	@RequestMapping(value="getScores")
	public List<Scores> getScores() {
		System.out.println(pokemonDAO.getScores().size());
		return pokemonDAO.getScores();
	}
	
	@ResponseBody
	@RequestMapping(value="putScore", method = RequestMethod.PUT)
	public void createScore(@RequestBody Scores score) {
		pokemonDAO.createScore(score);
	}
	
	
	//test connection
	@ResponseBody
	@RequestMapping(value="ping")
	public String ping() {
		return "pong";
	}
}