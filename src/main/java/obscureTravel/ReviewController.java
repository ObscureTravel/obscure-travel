package obscureTravel;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
	
	@Resource
	ReviewRepository reviewRepository;
	
	@Resource
	LocationRepository locationRepository;
	
	
	@RequestMapping("/allReviews")
	public Iterable<Review> showReviews() {
		return reviewRepository.findAll();
	}

	@RequestMapping("/{id}")
	public Iterable<Review> showReviewByLocation(@PathVariable Location location, Long id) {
		location = locationRepository.findOne(id);
		return reviewRepository.findByLocation(location);
	}
	
	@PostMapping
	public ResponseEntity<?> addReview(@RequestBody Review review) {
		return new ResponseEntity<>(reviewRepository.save(review), HttpStatus.CREATED);
	}
}
