package obscureTravel;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
	@Resource
	ReviewRepository reviewRepository;

	@RequestMapping("/showReviews")
	public Iterable<Review> showReviews() {
		
		return reviewRepository.findAll();
	}

//	@RequestMapping("/{id}")
//	public Review showReview(@PathVariable Long id) {
//		
//		return reviewRepository.findOne(id);
//	}
//	
//	@RequestMapping(method = RequestMethod.POST)
//	public ResponseEntity<?> addReview (@RequestBody Review review) {
//		
//		return new ResponseEntity<>(reviewRepository.save(review), HttpStatus.CREATED );
//	}
}