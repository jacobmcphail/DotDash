package gamegrid;

import java.util.ArrayList;

public class Driver {
    
    public static final int GRID_COLUMNS = 4;
    public static final int GRID_ROWS = 5;
    
    public static final int TEST_LENGTH = 20; //Must be desire path/sequence length

    public static void main(String[] args) {
        PathFinder finder = new PathFinder(new Grid(GRID_ROWS, GRID_COLUMNS));
        //runTappingTest(finder);
        runPathTest(finder);
        System.out.println("END");
    }
    
    public static void runTappingTest(PathFinder finder){
        ArrayList<Node> path;
        int counter = 0;  
        int failure = 0;
        while (counter < 10000) {
            finder.getGrid().reset();
            path = finder.findSequence(TEST_LENGTH);
            for (Node node : path) {
                System.out.println(node.getPosition());
            }
            System.out.println("PATH = " + path.size());
            if (path.size() < TEST_LENGTH || path.size() > TEST_LENGTH) {
                failure++;
            }
            counter++;
        } 
        if (failure > 0) {
            System.out.println("FAILED: " + failure + " / " + counter);
        } else {
            System.out.println("PASSED");
        }
    }
    
    public static void runPathTest(PathFinder finder){
        ArrayList<Node> path;
        int counter = 0;  
        int failure = 0;
        while (counter < 10000) {
            finder.getGrid().reset();
            path = finder.findPath(TEST_LENGTH);
            for (Node node : path) {
                System.out.println(node.getPosition());
            }
            System.out.println("PATH = " + path.size());
            if (path.size() < TEST_LENGTH || path.size() > TEST_LENGTH) {
                failure++;
            }
        counter++;
        } 
        if (failure > 0) {
            System.out.println("FAILED: " + failure + " / " + counter);
        } else {
            System.out.println("PASSED");
        }
    }

}
